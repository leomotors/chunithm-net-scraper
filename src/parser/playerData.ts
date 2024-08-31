/* eslint-disable no-irregular-whitespace */
/*
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
</div>
 */

import { JSDOM } from "jsdom";

// #region Internal
export function parseRatingImage(url: string) {
  const rating = url.split("_").at(-1)?.split(".")[0];

  const parsed = parseInt(rating!);
  if (isNaN(parsed)) {
    throw new Error("Invalid rating image URL");
  }

  return parsed;
}

export function getRatingImages(dom: JSDOM) {
  const imageList = dom.window.document.querySelectorAll(
    ".player_rating_num_block > img",
  );

  const imageArray = [...imageList] as HTMLImageElement[];

  return imageArray.map((img) => img.src);
}
// #endregion Internal

export function parseCurrentRating(dom: JSDOM) {
  const imageUrls = getRatingImages(dom);

  const ratings = imageUrls.map(parseRatingImage);

  // Last two value are decimal places
  const hundredth = ratings.pop()!;
  const tenth = ratings.pop()!;

  return parseFloat(`${ratings.join("")}.${tenth}${hundredth}`);
}

export function parseMaxRating(dom: JSDOM) {
  const maxRating =
    dom.window.document.querySelector(".player_rating_max")!.textContent!;

  return parseFloat(maxRating);
}

export function parseOverpower(dom: JSDOM) {
  const content = dom.window.document.querySelector(
    ".player_overpower_text",
  )!.textContent!;

  return {
    value: parseFloat(content.split(" ")[0]),
    percent: parseFloat(content.split(" ")[1].slice(1, -2)),
  };
}

export function parseLastPlayed(dom: JSDOM) {
  const content = dom.window.document.querySelector(
    ".player_lastplaydate_text",
  )!.textContent!;

  return new Date(`${content} UTC+9`);
}
