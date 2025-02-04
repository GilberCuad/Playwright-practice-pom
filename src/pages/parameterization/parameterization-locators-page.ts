interface IParameterization {
  homePageTitle: string;
  buttonContinue: string;

  actionCancel: {
    buttonCancel: string;
    buttonReturnPopUp: string;
    buttonConfirmCancel: string;
    titlePopup: string;
  };

  basicData: {
    nameInput: string;
    typeFTPRadioButton: string;
    typeFTPSRadioButton: string;
    typeSFTPRadioButton: string;
    descriptionInput: string;
    nameInputFieldRequire: string;
    buttonReturn: string;
    messageLengthMinimumNameInput: string;
    messageLengthMinimumDescriptionInput: string;
    messageLengthMaximumNameInput: string;
    messageLengthMaximumDescriptionInput: string;
  };

  connectionData: {
    hostInput: string;
    portInput: string;
    userInput: string;
    passwordInput: string;
    originInput: string;
    destinationInput: string;
    hostInputFieldRequired: string;
    portInputFieldRequired: string;
    userInputFieldRequired: string;
    passwordInputFieldRequired: string;
    originInputFieldRequired: string;
    destinationInputFieldRequired: string;
    messageLengthMinHostInput: string;
    messageLengthMinPortInput: string;
    messageLengthMinUserInput: string;
    messageLengthMinPasswordInput: string;
    messageLengthMinOriginInput: string;
    messageLengthMinDestinationInput: string;
    messageLengthMaxHostInput: string;
    messageLengthMaxPortInput: string;
    messageLengthMaxUserInput: string;
    messageLengthMaxPasswordInput: string;
    messageLengthMaxOriginInput: string;
    messageLengthMaxDestinationInput: string;
  };

  configData: {
    regexInput: string;
    configurationReceptionRadioButton: string;
    configurationOutputFileRadioButton: string;
    buttonActiveStatus: string;
    buttonInactiveStatus: string;
    messageFieldRequireRegexInput: string;
    messageLengthMinRegexInput: string;
    messageLengthMaxRegexInput: string;
  };

  programPeriodicity: {
    buttonCreate: string;
    titlePage: string;

    minutes: {
      minutesSelect: string;
    };

    beginTo: {
      beginToHour: string;
      beginMinutes: string;
    }

    everyHour: {
      eacHoursSelect: string;
    };

    diary: {
      everDayRadioButton: string;
      everyDayOfTheWeek: string;
    };

    weekly: {
      mondayCheck: string;
      tuesdayCheck: string;
      wednesdayCheck: string;
      thursdayCheck: string;
      fridayCheck: string;
      saturdayCheck: string;
      sundayCheck: string;
    };

    monthly: {
      dayOfEachCheck: string;
      theOfEachCheck: string;
      monthFirstRowSelectDay: string;
      monthFistRowSelectMonth: string;
      monthSecondRowSelectSequence: string;
      monthSecondRowSelectDaysWeek: string;
      monthSecondRowSelectMonth: string;
    };

    yearly: {
      eachCheck: string;
      theOfEachCheck: string;
      yearlyFistRowOfEachMonthSelect: string;
      yearlyFistRowOfEachDaySelect: string;
      yearlySecondRowSequenceSelect: string;
      yearlySecondRowDayWeekSelect: string;
      yearlySecondRowMonthsSelect: string;
    };

    optionsPeriodicity: {
      minutesOption: string;
      eachHourOption: string;
      diaryOption: string;
      weeklyOption: string;
      monthlyOption: string;
      yearlyOption: string;
    };
  };
}

export const LocatorsParameterization: IParameterization = {
  homePageTitle: "#new-parameterization",
  buttonContinue: "#button-continue",

  actionCancel: {
    buttonCancel: "#button-cancel",
    buttonReturnPopUp: "#button-go-back",
    buttonConfirmCancel: "#button-yes-cancel",
    titlePopup: "#modal-cancel__title",
  },

  basicData: {
    nameInput: "#name",
    typeFTPRadioButton: "#radio-option-ftp",
    typeFTPSRadioButton: "#radio-option-ftps",
    typeSFTPRadioButton: "#radio-option-sftp",
    descriptionInput: "#description",
    nameInputFieldRequire: "#name-error-message",
    buttonReturn: "#button-back",
    messageLengthMinimumNameInput: "#name-error-message",
    messageLengthMinimumDescriptionInput: "#description-error-message",
    messageLengthMaximumNameInput: "#name-error-message",
    messageLengthMaximumDescriptionInput: "#description-error-message",
  },

  connectionData: {
    hostInput: "#host",
    portInput: "#port",
    userInput: "#user",
    passwordInput: "#password",
    originInput: "#source",
    destinationInput: "#destination",
    hostInputFieldRequired: "#host-error-message",
    portInputFieldRequired: "#port-error-message",
    userInputFieldRequired: "#user-error-message",
    passwordInputFieldRequired: "#password-error-message",
    originInputFieldRequired: "#source-error-message",
    destinationInputFieldRequired: "#destination-error-message",
    messageLengthMinHostInput: "#host-error-message",
    messageLengthMinPortInput: "#port-error-message",
    messageLengthMinUserInput: "#user-error-message",
    messageLengthMinPasswordInput: "#password-error-message",
    messageLengthMinOriginInput: "#source-error-message",
    messageLengthMinDestinationInput: "#destination-error-message",
    messageLengthMaxHostInput: "#host-error-message",
    messageLengthMaxPortInput: "#port-error-message",
    messageLengthMaxUserInput: "#user-error-message",
    messageLengthMaxPasswordInput: "#password-error-message",
    messageLengthMaxOriginInput: "#source-error-message",
    messageLengthMaxDestinationInput: "#destination-error-message",
  },

  configData: {
    regexInput: "#regex",
    configurationReceptionRadioButton: "#radio-option-recepción",
    configurationOutputFileRadioButton: "#radio-option-salida_de_archivos",
    buttonActiveStatus: "#Activo",
    buttonInactiveStatus: '#Inactivo',
    messageFieldRequireRegexInput: "#regex-error-message",
    messageLengthMinRegexInput: "#regex-error-message",
    messageLengthMaxRegexInput: "#regex-error-message",
  },

  programPeriodicity: {
    buttonCreate: "#button-create",
    titlePage: "#periodicity-title",

    beginTo: {
      beginToHour: "#select-input-hour_id",
      beginMinutes: "#select-input-minute_id",
    },

    minutes: {
      minutesSelect: "#select-input-minute_id",
    },

    everyHour: {
      eacHoursSelect: "#select-container-frequency_hour_id",
    },

    diary: {
      everDayRadioButton: "#radio-option-cada_día",
      everyDayOfTheWeek: "#radio-option-todos_los_días_de_la_semana",
    },

    weekly: {
      mondayCheck: "#checkbox-label-lunes",
      tuesdayCheck: "#checkbox-label-martes",
      wednesdayCheck: "#checkbox-label-miércoles",
      thursdayCheck: "#checkbox-label-jueves",
      fridayCheck: "#checkbox-label-viernes",
      saturdayCheck: "#checkbox-label-sábado",
      sundayCheck: "#checkbox-label-domingo",
    },


    monthly: {
      dayOfEachCheck: "#radio-option-día",
      theOfEachCheck: "#radio-option-el",
      monthFirstRowSelectDay: "#select-input-day_month_id",
      monthFistRowSelectMonth: "#select-input-frequency_month_first_option",
      monthSecondRowSelectSequence: "#select-input-week_id",
      monthSecondRowSelectDaysWeek: "#select-input-day_week_unique_id",
      monthSecondRowSelectMonth: "#select-input-frequency_month_second_option",
    },

    yearly: {
      eachCheck: "#radio-option-cada",
      theOfEachCheck: "#radio-option-el",

      yearlyFistRowOfEachMonthSelect: "#select-input-month_first_option",
      yearlyFistRowOfEachDaySelect: "#select-input-day_month_id",

      yearlySecondRowSequenceSelect: "#select-input-week_id",
      yearlySecondRowDayWeekSelect: "#select-input-day_week_unique_id",
      yearlySecondRowMonthsSelect: "#select-input-month_second_option",
    },

    optionsPeriodicity: {
      minutesOption: "#tab-minutos",
      eachHourOption: "#tab-cada_hora",
      diaryOption: "#tab-diario",
      weeklyOption: "#tab-semanal",
      monthlyOption: "#tab-mensual",
      yearlyOption: "#tab-anual",
    },
  },
};
