import { JSDOM } from "jsdom";
import { expect, test } from "vitest";

import { parseMusic } from "./music.js";

const m1 = `
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
</div>`;

const m1Dom = new JSDOM(m1);

const m2 = `
<div class="w388 musiclist_box bg_expert">
  <div class="music_title">DA'AT -The First Seeker of Souls-</div>
  <!-- ◆スコア -->
  <div class="play_musicdata_highscore">
    SCORE：<span class="text_b">1,006,667</span>
  </div>
  <input type="hidden" name="diff" value="2">
  <input type="hidden" name="genre" value="99">
  <input type="hidden" name="idx" value="2241">
  <input type="hidden" name="token" value="806c2d9999cd3e2953cbf64fb4fc8e8d">
</div>`;

const m2Dom = new JSDOM(m2);

const m3 = `
<div class="w388 musiclist_box bg_ultima">
  <div class="music_title">Snow Colored Score</div>
  <!-- ◆スコア -->
  <div class="play_musicdata_highscore">
    SCORE：<span class="text_b">1,003,646</span>
  </div>
  <input type="hidden" name="diff" value="4">
  <input type="hidden" name="genre" value="99">
  <input type="hidden" name="idx" value="2416">
  <input type="hidden" name="token" value="806c2d9999cd3e2953cbf64fb4fc8e8d">
</div>`;

const m3Dom = new JSDOM(m3);

test("Music parser", () => {
  expect(parseMusic(m1Dom.window.document.documentElement)).toEqual({
    musicTitle: "Fracture Ray",
    score: 1005601,
    difficulty: 3,
  });

  expect(parseMusic(m2Dom.window.document.documentElement)).toEqual({
    musicTitle: "DA'AT -The First Seeker of Souls-",
    score: 1006667,
    difficulty: 2,
  });

  expect(parseMusic(m3Dom.window.document.documentElement)).toEqual({
    musicTitle: "Snow Colored Score",
    score: 1003646,
    difficulty: 4,
  });
});
