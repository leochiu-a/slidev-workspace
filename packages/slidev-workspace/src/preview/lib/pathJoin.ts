/**
 * Join multiple path segments into a single path
 * - Removes duplicate slashes
 * - Handles leading and trailing slashes properly
 * - Works with both relative and absolute paths
 *
 * @example
 * pathJoin('/base/', '/path/', 'file.jpg') // '/base/path/file.jpg'
 * pathJoin('base', 'path', 'file.jpg') // 'base/path/file.jpg'
 * pathJoin('/base/', 'path') // '/base/path'
 */
export function pathJoin(...segments: string[]): string {
  if (segments.length === 0) return "";

  // Filter out empty segments
  const filtered = segments.filter((segment) => segment !== "");
  if (filtered.length === 0) return "";

  // Check if path should start with /
  const isAbsolute = filtered[0].startsWith("/");

  // Process each segment: remove leading and trailing slashes
  const processed = filtered.map((segment) => {
    return segment.replace(/^\/+|\/+$/g, "");
  });

  // Filter out empty strings after processing
  const nonEmpty = processed.filter((segment) => segment !== "");

  if (nonEmpty.length === 0) {
    return isAbsolute ? "/" : "";
  }

  // Join with single slash
  const joined = nonEmpty.join("/");

  // Add leading slash if original path was absolute
  return isAbsolute ? `/${joined}` : joined;
}
