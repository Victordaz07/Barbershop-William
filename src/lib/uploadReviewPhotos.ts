// Firebase Storage isn't enabled on this project yet (Spark plan, deferred
// until the client decides on it). This stub defines the real call signature
// so ReviewForm doesn't need to change once Storage is wired up — swap the
// body for actual `uploadBytes`/`getDownloadURL` calls and nothing else moves.
export async function uploadReviewPhotos(files: File[]): Promise<string[]> {
  void files;
  return [];
}
