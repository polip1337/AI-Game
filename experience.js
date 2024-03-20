// Function to add experience to a skill
function calcExp(){

}
function addExperience(skillIndex, amount) {
  skills[skillIndex].experience += amount;
  checkLevelUp(skillIndex);
  updateExpBars();
}

// Function to check if a skill has leveled up
function checkLevelUp(skillIndex) {
  const skill = skills[skillIndex];
  skills[skillIndex].progress = Math.round((skill.experience/skill.experienceToLevel)*100);

  if (skill.experience >= skill.experienceToLevel) {
    levelUpSkill(skillIndex);
  }
}

function levelUpSkill(skillIndex){
    const skill = skills[skillIndex];

    skill.level++;
    skill.experience = 0;
    skill.experienceToLevel = Math.round(skill.experienceToLevel * 1.05);
    document.getElementById('SkillText'+skill.name).innerHTML = skill.name + " " + skill.level;
}
function updateExpBars() {
  document.getElementById('progressUnity').style.width = skills[0].progress+ "%";
  document.getElementById('progressGrowth').style.width = skills[1].progress+ "%";
  document.getElementById('progressSecurity').style.width = skills[2].progress+ "%";
  document.getElementById('progressKnowledge').style.width = skills[3].progress+ "%";
  document.getElementById('progressTrust').style.width = skills[4].progress+ "%";
  document.getElementById('progressEfficiency').style.width = skills[5].progress+ "%";
}