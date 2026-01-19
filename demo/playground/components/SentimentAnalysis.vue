<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { env, pipeline } from "@xenova/transformers";

// NOTE: Model inference isn't covered by automated tests; verify in slide preview.
const inputText = ref(
  "JavaScript + AI is incredibly powerful, and the dev experience feels smooth!",
);
const sentiment = ref({
  positive: 1,
  negative: 0,
  inferenceTime: 0,
});
const isAnalyzing = ref(false);
const isModelLoading = ref(false);
const modelReady = ref(false);
const showCode = ref(false);
const classifier = ref<((text: string) => Promise<any>) | null>(null);
const modelError = ref<string | null>(null);

// Ensure we load from Hugging Face instead of the Slidev `/models` path.
env.allowLocalModels = false;
env.allowRemoteModels = true;
// Avoid reusing a cached HTML response from `/models` in the browser cache.
env.useBrowserCache = false;

const sentimentCodeSrc = "/assets/sentiment-analysis.svg";

const analyzeSentiment = async () => {
  if (!inputText.value.trim() || isAnalyzing.value || !modelReady.value) return;
  if (!classifier.value) return;

  isAnalyzing.value = true;
  const startTime = performance.now();

  try {
    const textToAnalyze = inputText.value.trim();
    const result = await classifier.value(textToAnalyze);
    const endTime = performance.now();
    const inferenceTime = Math.round(endTime - startTime);

    const label = String(result?.[0]?.label ?? "").toLowerCase();
    const score = Number(result?.[0]?.score ?? 0);

    let positiveScore = 0;
    let negativeScore = 0;

    if (label.includes("pos")) {
      positiveScore = Math.round(score * 100);
      negativeScore = 100 - positiveScore;
    } else if (label.includes("neg")) {
      negativeScore = Math.round(score * 100);
      positiveScore = 100 - negativeScore;
    } else {
      positiveScore = 50;
      negativeScore = 50;
    }

    sentiment.value = {
      positive: positiveScore,
      negative: negativeScore,
      inferenceTime,
    };
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
  } finally {
    isAnalyzing.value = false;
  }
};

const verdict = computed(() =>
  sentiment.value.positive > sentiment.value.negative ? "POSITIVE" : "NEGATIVE",
);
const verdictColor = computed(() =>
  sentiment.value.positive > sentiment.value.negative
    ? "bg-green-900 text-green-300 border-green-700"
    : "bg-red-900 text-red-300 border-red-700",
);

onMounted(async () => {
  isModelLoading.value = true;
  modelError.value = null;
  if (typeof caches !== "undefined") {
    try {
      await caches.delete("transformers-cache");
    } catch (error) {
      console.warn("Failed to clear transformers cache:", error);
    }
  }
  try {
    classifier.value = await pipeline(
      "sentiment-analysis",
      "Xenova/distilbert-base-multilingual-cased-sentiments-student",
    );
    modelReady.value = true;
  } catch (error) {
    console.error("Failed to load model:", error);
    modelReady.value = false;
    modelError.value = error instanceof Error ? error.message : "Unknown error";
  } finally {
    isModelLoading.value = false;
  }
});
</script>

<template>
  <div class="mx-auto mt-1 flex h-full w-full max-w-2xl flex-col px-3 py-4">
    <div class="mb-4 text-center">
      <div class="mt-1.5 flex items-center justify-center gap-2">
        <button
          class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all"
          :class="
            !showCode
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
          "
          @click="showCode = false"
        >
          ⌨️ Interactive demo
        </button>
        <button
          class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all"
          :class="
            showCode
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
          "
          @click="showCode = true"
        >
          💻 View source
        </button>
      </div>
    </div>

    <div class="flex-1">
      <div v-if="!showCode">
        <div
          class="mt-4 rounded-2xl border border-slate-700/50 bg-slate-800/30 p-4 shadow-2xl backdrop-blur-sm"
        >
          <div class="mb-6">
            <label class="mb-2 block text-[11px] text-slate-300">
              Try a sentence. Transformers.js runs locally in the browser:
            </label>
            <div class="relative">
              <textarea
                v-model="inputText"
                rows="2"
                class="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-[12px] text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Example: This is an amazing idea, I fully support it!"
                :disabled="!modelReady"
              />
              <div class="absolute right-3 bottom-3">
                <button
                  class="flex items-center gap-2 rounded-lg bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white shadow-lg transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="isAnalyzing || !modelReady || isModelLoading"
                  @click="analyzeSentiment"
                >
                  <span v-if="isAnalyzing" class="animate-spin">⚙️</span>
                  <span v-else>📈</span>
                  {{ isAnalyzing ? "Analyzing..." : "Analyze" }}
                </button>
              </div>
            </div>
          </div>

          <div class="transform transition-all duration-300">
            <div class="mb-2 flex items-center justify-between">
              <span
                class="font-mono text-[10px] tracking-wider text-slate-400 uppercase"
              >
                Confidence Score
              </span>
              <span class="font-mono text-[10px] text-slate-400">
                {{ sentiment.inferenceTime }} ms
              </span>
            </div>

            <div
              class="relative mb-3 h-4 w-full overflow-hidden rounded-full bg-slate-900 shadow-inner"
            >
              <div
                class="absolute top-0 bottom-0 left-1/2 z-10 w-0.5 bg-slate-700"
              />
              <div
                class="absolute left-1/2 h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-700 ease-out"
                :style="{ width: `${sentiment.positive / 2}%` }"
              />
              <div
                class="absolute right-1/2 h-full bg-gradient-to-l from-red-600 to-red-400 transition-all duration-700 ease-out"
                :style="{ width: `${sentiment.negative / 2}%` }"
              />
            </div>

            <div class="flex items-center justify-between text-[11px]">
              <div class="w-1/3 text-left">
                <span class="block text-[9px] text-slate-400">Negative</span>
                <span
                  class="text-[12px] font-bold text-red-400"
                  :class="{ 'opacity-50': sentiment.negative <= 50 }"
                >
                  {{ sentiment.negative }}%
                </span>
              </div>
              <div class="w-1/3 text-center">
                <div
                  class="inline-block rounded border px-2.5 py-0.5 text-[11px] font-bold"
                  :class="verdictColor"
                >
                  {{ verdict }}
                </div>
              </div>
              <div class="w-1/3 text-right">
                <span class="block text-[9px] text-slate-400">Positive</span>
                <span
                  class="text-[12px] font-bold text-green-400"
                  :class="{ 'opacity-50': sentiment.positive <= 50 }"
                >
                  {{ sentiment.positive }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 text-center text-xs">
          <div
            v-if="isModelLoading"
            class="flex items-center justify-center gap-2 text-yellow-400"
          >
            <span class="animate-bounce">⬇️</span>
            Downloading model... (first run ~60MB)
          </div>
          <div
            v-else-if="modelReady"
            class="flex items-center justify-center gap-2 text-green-400"
          >
            ✅ Model ready (DistilBERT Sentiment Analysis)
          </div>
          <div
            v-else-if="modelError"
            class="flex items-center justify-center gap-2 text-red-400"
          >
            ❌ Model failed to load (check console)
          </div>
          <div v-else class="flex items-center justify-center text-slate-500">
            Model idle (waiting to load)
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 shadow-2xl"
      >
        <img
          :src="sentimentCodeSrc"
          alt="Sentiment Analysis Source Code"
          class="h-auto w-full rounded-lg"
        />
      </div>
    </div>
  </div>
</template>
