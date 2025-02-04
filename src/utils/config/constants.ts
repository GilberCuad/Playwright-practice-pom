import dotenv from "dotenv";
import { getTimeStamp } from "../../utils/time-stamp/date-utils";
import { LocatorsParameterization } from "../../pages/parameterization/parameterization-locators-page";

dotenv.config();

export const config = {
  addressUrl: process.env.ADDRESS_URL,
  userMail: process.env.USER_MAIL,
  password: process.env.PASSWORD,
  apiLoginUrl: process.env.API_LOGIN_URL,
  timeStampString: getTimeStamp(),
  inactivityTimeOutMS: 182000,
  timeOutTestMS: 240000,
  timeOutScreenCapture: 2000,
};

export const parameterizationConfig = {
  weeks: ["Primero", "Segundo", "Tercero", "Cuarto"],
  days: ["Lunes", "Martes", "Miércoles", "Jueves", "Sábado", "Domingo"],
  months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  optionMap: {
    0: "Minutos",
    1: "Cada hora",
    2: "Diario",
    3: "Semanal",
    4: "Mensual",
    5: "Anual",
  },

  radioButtonTypeId: {
    everyDay: LocatorsParameterization.programPeriodicity.diary.everDayRadioButton,
    everyDayOfTheWeek: LocatorsParameterization.programPeriodicity.diary.everyDayOfTheWeek,
  },

  radioButtonTypeIdMonth: {
    dayOfEachCheck: LocatorsParameterization.programPeriodicity.monthly.dayOfEachCheck,
    theOfEachCheck: LocatorsParameterization.programPeriodicity.monthly.theOfEachCheck,
  },


  basicData: {
    radioButtonTypeId: {
      FTP: LocatorsParameterization.basicData.typeFTPRadioButton,
      FTPS: LocatorsParameterization.basicData.typeFTPSRadioButton,
      SFTP: LocatorsParameterization.basicData.typeSFTPRadioButton,
    },
  },

  configurationData: {
    radioButtonType: {
      reception: LocatorsParameterization.configData.configurationReceptionRadioButton,
      fileOutput: LocatorsParameterization.configData.configurationOutputFileRadioButton,
    },

    radioButtonTypeIdState: {
      Activo: LocatorsParameterization.configData.buttonActiveStatus,
      Inactivo: LocatorsParameterization.configData.buttonInactiveStatus,
    },
  },
}
