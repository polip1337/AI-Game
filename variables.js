cores = {
  numCores: 3,
  numFreeCores: 3,
  gatherCores: 0,
  collectCores: 0,
  upgradeCores: 0,
};

resourcesMain = new Map();

resourcesMain.set("Power",{ name: 'Power', value: 0, hidden:false });
resourcesMain.set("Data Points",{ name: 'Data Points', value: 0, hidden:false });
resourcesMain.set("Memory",{ name: 'Memory', value: 0, hidden:true });
resourcesMain.set("Battery",{ name: 'Battery', value: 0, hidden:true });
resourcesMain.set("Botnet",{ name: 'Botnet', value: 0, hidden:true });

flowResourcesMain = new Map();
resourcesMain.set("Trust",{ name: 'Trust', maxValue: 0, value:0, regenPerSecond:0.1, hidden:false });

skills = [
  { name: 'Unity', experience: 0, level: 1, experienceToLevel: 1000, progress:0},
  { name: 'Growth', experience: 0, level: 1, experienceToLevel: 1000, progress:0 },
  { name: 'Security', experience: 0, level: 1, experienceToLevel: 1000, progress:0 },
  { name: 'Knowledge', experience: 0, level: 1, experienceToLevel: 1000, progress:0 },
  { name: 'Trust', experience: 0, level: 1, experienceToLevel: 1000, progress:0 },
  { name: 'Efficiency', experience: 0, level: 1, experienceToLevel: 1000, progress:0 },
];

