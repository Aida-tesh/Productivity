const homeScreen = document.querySelector(
  ".js-background .js-background__home"
);
const settingScreen = document.querySelector(".js-background__setting");

const navigationBar = document.querySelector(".js-background__navigation");
const homeButton = navigationBar.querySelector("div li:first-child button");
const toDoButton = navigationBar.querySelector("div li:nth-child(2) button");
// add notes button here
const notesButton = navigationBar.querySelector("div li:nth-child(3) button");

const settingButton = navigationBar.querySelector("div li:last-child button");
const smileButton = navigationBar.querySelector(".js-navigation__smile-button");

const ADDED_CLASSNAME = "added";
const CURRENT_SCREEN_CLASSNAME = "current-screen";

let isOnHomeScreen = true;
let isOnToDoScreen = false;
let isOnNotesScreen = false;
let isOnSettingScreen = false;

function _switchScreens(currentScreen, newScreen) {
  // Is after fadeIn when user switches screens more than once
  fadeOut(currentScreen, { isAfterIn: true });
  setTimeout(() => {
    fadeIn(newScreen, { isAfterOut: true });
  }, TRANSITION_DURATION);

  if (currentScreen === homeScreen) {
    isOnHomeScreen = false;
  } else if (currentScreen === TO_DO_SCREEN) {
    isOnToDoScreen = false;
  } else if (currentScreen === NOTES_SCREEN) {
    isOnNotesScreen = false;
  } 
  else {
    isOnSettingScreen = false;
  }
}

function switchScreens({
  isHomeClicked,
  isToDoClicked,
  isNotesClicked,
  isSettingClicked,
} = {}) {
  let currentScreen;

  if (isOnHomeScreen) {
    currentScreen = homeScreen;
  } else if (isOnToDoScreen) {
    currentScreen = TO_DO_SCREEN;
  } else if (isOnNotesScreen) {
    currentScreen = NOTES_SCREEN;
  } else {
    currentScreen = settingScreen;
  }

  const switchButtons = (newButton, oldButtons) => {
    newButton.classList.add(CURRENT_SCREEN_CLASSNAME);
    oldButtons.forEach((oldButton) => {
      oldButton.classList.remove(CURRENT_SCREEN_CLASSNAME);
    });
  };

  if (isHomeClicked && !isOnHomeScreen) {
    _switchScreens(currentScreen, homeScreen);
    isOnHomeScreen = true;
    switchButtons(homeButton, [toDoButton, notesButton, settingButton]);
  }

  if (isToDoClicked && !isOnToDoScreen) {
    _switchScreens(currentScreen, TO_DO_SCREEN);
    isOnToDoScreen = true;
    switchButtons(toDoButton, [homeButton, notesButton, settingButton]);
  }
  // added condition to change current screen for notes
  if (isNotesClicked && !isOnNotesScreen){
    _switchScreens(currentScreen, NOTES_SCREEN);
    isOnNotesScreen = true;
    switchButtons(notesButton, [homeButton, toDoButton, settingButton])
  }

  if (isSettingClicked && !isOnSettingScreen) {
    _switchScreens(currentScreen, settingScreen);
    isOnSettingScreen = true;
    switchButtons(settingButton, [homeButton, toDoButton, notesButton]);
  }
}

function handleSettingClick() {
  switchScreens({ isSettingClicked: true });
}

function handleToDoClick() {
  switchScreens({ isToDoClicked: true });
}

function handleHomeClick() {
  switchScreens({ isHomeClicked: true });
}
// handle notes click with function
function handleNotesClick() {
  switchScreens({ isNotesClicked: true });
}

function enableButtons() {
  navigationBar.classList.add("signed-in");

  homeButton.classList.add(CURRENT_SCREEN_CLASSNAME);

  homeButton.addEventListener(CLICK_EVENT, handleHomeClick);
  toDoButton.addEventListener(CLICK_EVENT, handleToDoClick);
  // add listner for notes button
  notesButton.addEventListener(CLICK_EVENT, handleNotesClick); 
  settingButton.addEventListener(CLICK_EVENT, handleSettingClick);

  smileButton.addEventListener("mouseover", () => {
    SMILE_MODAL.classList.add(ADDED_CLASSNAME);
  });

  smileButton.addEventListener("mouseleave", () => {
    SMILE_MODAL.classList.remove(ADDED_CLASSNAME);
  });
}
