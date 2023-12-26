export const doctorModel = {
  userGroupId: "",
  userAccount: "",
  name: "",
  groups: [],
  dutyColumns: [],
  only12: false,
  nonWorkingDays: [],
  maximum: 99,
  password: "",
  isManager: false
};

export const doctorRosterModel = {
  ...doctorModel,
  blacklist: [],
  vacation: [],
  greenlist: [],
  duties: [],
  weekends: [],
  points: 0,
};

export const dayModel = {
  date: new Date(),
  isHoliday: false,
  dutyColumns: {},
};

export const rosterModel = {
  id: "",
  name: "",
  userGrupId: "",
  doctors: {
    [doctorRosterModel.id]: doctorRosterModel,
  },
  roster: { [dayModel.date.getDate()]: dayModel },
};
