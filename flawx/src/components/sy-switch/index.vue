<template>
  <div
    :class="[
      data.status ? `sy-switch-body-daytime` : `sy-switch-body-nightmare`,
    ]"
    @click="doSwitch"
  >
    <div
      :class="[
        data.status ? `sy-switch-ball-daytime` : `sy-switch-ball-nightmare`,
      ]"
    ></div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

let data = reactive({
  num: 1,
  status: true,
});

const doSwitch = () => {
  console.log("click");
  data.num += 1;
  if (data.num % 2 == 0) {
    //偶数设置夜主题;
    document.documentElement.style.setProperty(
      "--color-light1",
      "rgb(205, 209, 228)"
    );
    document.documentElement.style.setProperty(
      "--color-light2",
      "rgb(132, 140, 207)"
    );
    document.documentElement.style.setProperty(
      "--color-light3",
      "rgb(52, 45, 113)"
    );
    document.documentElement.style.setProperty(
      "--color-light4",
      "rgb(82, 78, 183)"
    );
    document.documentElement.style.setProperty("--color-deep1", "");
    document.documentElement.style.setProperty(
      { "--color-light1": "rgb(82, 78, 183)" },
      { "--color-light2": "rgb(82, 78, 183)" }
    );
    data.status = false;
  } else {
    document.documentElement.style.setProperty(
      "--color-light1",
      "rgb(238, 238, 238)"
    );
    document.documentElement.style.setProperty(
      "--color-light2",
      "rgb(234, 255, 253)"
    );
    document.documentElement.style.setProperty(
      "--color-light3",
      "rgb(204, 240, 247)"
    );
    document.documentElement.style.setProperty(
      "--color-light4",
      "rgb(169, 245, 245)"
    );
    document.documentElement.style.setProperty(
      "--color-deep1",
      "rgb(183, 183, 183)"
    );
    document.documentElement.style.setProperty(
      "--color-deep2",
      "rgb(175, 175, 175)"
    );
    document.documentElement.style.setProperty(
      "--color-deep3",
      "rgb(150, 150, 150)"
    );
    document.documentElement.style.setProperty(
      "--color-deep4",
      "rgb(112, 112, 112)"
    );
    data.status = true;
  }
};
</script>

<style scoped>
.sy-switch-body-daytime {
  height: 1.6rem;
  width: 3rem;
  transition: 0.5s;
  overflow: hidden;
  border-radius: 15px;
  background-color: rgb(152, 250, 250);
}

.sy-switch-ball-daytime {
  height: 1.3rem;
  width: 1.4rem;
  margin: 0.15rem;
  transition: 0.5s;
  border-radius: 45%;
  background-color: rgba(255, 255, 255, 0.6);
}

.sy-switch-body-nightmare {
  height: 1.6rem;
  width: 3rem;
  transition: 0.5s;
  overflow: hidden;
  border-radius: 15px;
  background-image: linear-gradient(
    to left top,
    rgb(243, 0, 166),
    rgb(44, 6, 43)
  );
}

.sy-switch-ball-nightmare {
  height: 1.3rem;
  width: 1.4rem;
  margin: 0.15rem;
  margin-left: 49%;
  transition: 0.5s;
  border-radius: 45%;
  background-color: rgba(43, 43, 43, 0.6);
}
</style>