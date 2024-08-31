/* eslint-disable no-irregular-whitespace */
import { JSDOM } from "jsdom";
import { expect, test } from "vitest";

import {
  getRatingImages,
  parseCurrentRating,
  parseLastPlayed,
  parseMaxRating,
  parseOverpower,
  parseRatingImage,
} from "./playerData";

test("Image Rating parser", () => {
  const jobs: [string, number][] = [
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_silver_01.png",
      1,
    ],
    ["https://chunithm-net-eng.com/mobile/images/rating/rating_gold_01.png", 1],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_01.png",
      1,
    ],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_silver_03.png",
      3,
    ],
    ["https://chunithm-net-eng.com/mobile/images/rating/rating_gold_03.png", 3],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_03.png",
      3,
    ],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_silver_05.png",
      5,
    ],
    ["https://chunithm-net-eng.com/mobile/images/rating/rating_gold_05.png", 5],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_05.png",
      5,
    ],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_silver_09.png",
      9,
    ],
    ["https://chunithm-net-eng.com/mobile/images/rating/rating_gold_09.png", 9],
    [
      "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_09.png",
      9,
    ],
  ];

  jobs.forEach(([url, expected]) => {
    expect(parseRatingImage(url)).toBe(expected);
  });
});

const playerRatingDiv = `
<div class="player_data_right">
  <div class="player_team_emblem_normal"></div>
    <div class="player_team_data">
    <div class="player_team_name font_x-small">ＣＰ　ｖｓ　ＣＥＤＴ</div>
  </div>
  <div class="player_honor_short" style="background-image:url(https://chunithm-net-eng.com/mobile/images/honor_bg_platina.png)">
    <div class="player_honor_text_view">
        <div class="player_honor_text" draggable="true"><span>携帯恋話</span></div>
    </div>
  </div>
  <div class="player_name">
    <div class="player_lv">45</div>
    <div class="player_name_in">Ｌｅｏψｒθφ</div>
    <div class="player_classemblem">
      <div class="player_classemblem_top">
        <img src="https://chunithm-net-eng.com/mobile/images/classemblem_medal_04.png">
      </div>                
    </div>
  </div>
  <div class="player_rating">
    <div class="player_rating_num_block">
      <img src="https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_01.png">
      <img src="https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_05.png">
      <div class="player_rating_comma">
        <img src="https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_comma.png">
      </div>
      <img src="https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_09.png">
      <img src="https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_06.png">
    </div>
    <div class="player_rating_max">15.96</div>
  </div>
  <div class="player_overpower">
    <div class="player_overpower_text">18617.60 (18.12%)</div>
  </div>
  <div class="player_lastplaydate">
    <div class="player_lastplaydate_text">2024/08/30 17:58</div>
  </div>
</div>`;

const dom = new JSDOM(playerRatingDiv);

test("DOM Rating Image Parser", () => {
  const ratings = getRatingImages(dom);

  expect(ratings).toEqual([
    "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_01.png",
    "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_05.png",
    "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_09.png",
    "https://chunithm-net-eng.com/mobile/images/rating/rating_platinum_06.png",
  ]);
});

test("DOM Rating Parser", () => {
  expect(parseCurrentRating(dom)).toBe(15.96);
  expect(parseMaxRating(dom)).toBe(15.96);
});

test("DOM Overpower Parser", () => {
  expect(parseOverpower(dom)).toEqual({
    value: 18617.6,
    percent: 18.12,
  });
});

test("DOM Last Played Parser", () => {
  expect(parseLastPlayed(dom)).toEqual(new Date("2024-08-30T08:58:00Z"));
});
