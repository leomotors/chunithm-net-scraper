/*
<div class="w388 musiclist_box bg_master">
	<div class="music_title">Fracture Ray</div>
	<!-- ◆スコア -->
	<div class="play_musicdata_highscore">
		SCORE：<span class="text_b">1,005,601</span>
	</div>
	<input type="hidden" name="diff" value="3">
	<input type="hidden" name="genre" value="99">
	<input type="hidden" name="idx" value="749">
	<input type="hidden" name="token" value="806c2d9999cd3e2953cbf64fb4fc8e8d">
</div>
 */

export function parseMusic(element: Element) {
  const musicTitle = element.querySelector(".music_title")!.textContent!;

  const score = element.querySelector(
    ".play_musicdata_highscore .text_b",
  )!.textContent!;

  const scoreNumber = parseInt(score.replace(/,/g, ""));

  const difficulty = element
    .querySelector("input[name=diff]")!
    .getAttribute("value")!;

  return {
    musicTitle,
    score: scoreNumber,
    difficulty: parseInt(difficulty),
  };
}
