interface IPageMessage {
  configurationScreens: {
    tittleBasicData: string;
    tittleConnectionData: string;
    tittleConfiguration: string;
    tittleSchedulePeriodicity: string;
  };

  errorValidationInputs: {
    messageMandatoryInput: string;
  };

  messageHome: {
    newParameterization: string;
    SchedulePeriodicityTitle: string;
  };

  popupCancel: {
    tittlePopupCanceled: string;
  };

  dataBasic: {
    lengthMinimumNameInput: string;
    lengthMaximumNameInput: string;
    lengthMinimumDescriptionInput: string;
    lengthMaximumDescriptionInput: string;
    messageMaximumFieldName: string;
    messageMaximumFieldDescription: string;
    messageMinimumFieldName: string;
    messageMinimumFieldDescription: string;
  };

  connectionData: {
    valueTestHostInput: string;
    valueTestPortInput: string;
    valueTestUserInput: string;
    valueTestPasswordInput: string;
    valueTestOriginInput: string;
    valueTestDestinationInput: string;
    valueMinHostInput: string;
    messageMinHostInput: string;
    valueMinPortInput: string;
    messageMinPortInput: string;
    valueMinUserInput: string;
    messageMinUserInput: string;
    valueMinPasswordInput: string;
    messageMinPasswordInput: string;
    valueMinOriginInput: string;
    messageMinOriginInput: string;
    valueMinDestinationInput: string;
    messageMinDestinationInput: string;
    valueMaxHostInput: string;
    messageMaxHostInput: string;
    valueMaxPortInput: string;
    messageMaxPortInput: string;
    valueMaxUserInput: string;
    messageMaxUserInput: string;
    valueMaxPasswordInput: string;
    messageMaxPasswordInput: string;
    valueMaxOriginInput: string;
    messageMaxOriginInput: string;
    valueMaxDestinationInput: string;
    messageMaxDestinationInput: string;
  };

  configData: {
    valueLengthMinRegexInput: string;
    valueLengthMaxRegexInput: string;
    messageLengthMinRegexInput: string;
    messageLengthMaxRegexInput: string;
    valueInputRegex: string;
  };

  schedulePeriodicity: {
    titlePage: string;
  };
}

export const MessageUtilPage: IPageMessage = {
  configurationScreens: {
    tittleBasicData: "Datos básicos",
    tittleConnectionData: "Datos de conexión",
    tittleConfiguration: "Configuración",
    tittleSchedulePeriodicity: "Programar periodicidad",
  },

  errorValidationInputs: {
    messageMandatoryInput: "Campo obligatorio",
  },

  messageHome: {
    newParameterization: "Nueva parametrización",
    SchedulePeriodicityTitle: "Programar periodicidad cada:",
  },

  popupCancel: {
    tittlePopupCanceled:
      "¿Estás seguro de cancelar la creación de la parametrización?",
  },

  dataBasic: {
    lengthMinimumNameInput:
      'La longitud mínima permitida para el "Nombre" es de 10 caracteres',
    lengthMaximumNameInput:
      'La longitud máxima permitida para el "Nombre" es de 100 caracteres',
    lengthMinimumDescriptionInput:
      'La longitud mínima permitida para el "Descripción" es de 10 caracteres',
    lengthMaximumDescriptionInput:
      'La longitud máxima permitida para el "Descripción" es de 500 caracteres',
    messageMaximumFieldName:
      "Juan  Antonio  Francisco de Jesús María García López Rodríguez González Fernández de la Vega Martínez",
    messageMaximumFieldDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15 when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 501 characters",
    messageMinimumFieldName: "testingcx",
    messageMinimumFieldDescription: "lorem ips",
  },

  connectionData: {
    valueTestHostInput: "11.111.23.11",
    valueTestPortInput: "1523",
    valueTestUserInput: "Amarillo_1",
    valueTestPasswordInput: "Prueba01*$$$",
    valueTestOriginInput: "\\Amarillo\\Origen1",
    valueTestDestinationInput: "\\Amarillo\\Destino2",
    valueMinHostInput: "11.111.23",
    messageMinHostInput:
      'La longitud mínima permitida para el "Host" es de 10 caracteres',
    valueMinPortInput: "123",
    messageMinPortInput:
      'La longitud mínima permitida para el "Puerto" es de 4 caracteres',
    valueMinUserInput: "am",
    messageMinUserInput:
      'La longitud mínima permitida para el "Usuario" es de 3 caracteres',
    valueMinPasswordInput: "Hd8768t",
    messageMinPasswordInput:
      'La longitud mínima permitida para el "Contraseña" es de 8 caracteres',
    valueMinOriginInput: "\\",
    messageMinOriginInput:
      'La longitud mínima permitida para el "Origen" es de 3 caracteres',
    valueMinDestinationInput: "\\",
    messageMinDestinationInput:
      'La longitud mínima permitida para el "Destino" es de 3 caracteres',
    valueMaxHostInput: "11.111.233.212.1",
    messageMaxHostInput:
      'La longitud máxima permitida para el "Host" es de 15 caracteres',
    valueMaxPortInput: "123456",
    messageMaxPortInput:
      'La longitud máxima permitida para el "Puerto" es de 5 caracteres',
    valueMaxUserInput: "Gabriel de la espriel",
    messageMaxUserInput:
      'La longitud máxima permitida para el "Usuario" es de 20 caracteres',
    valueMaxPasswordInput: "Hd87687/ghjkay788hjvbnasy89as98d&",
    messageMaxPasswordInput:
      'La longitud máxima permitida para el "Contraseña" es de 32 caracteres',
    valueMaxOriginInput:
      "\\Amarilo\\Origen1\\TestAutomation\\lengththe100caracters\\input\\origen\\filesupdate\\loremIpsum\\istfswjdnsd",
    messageMaxOriginInput:
      'La longitud máxima permitida para el "Origen" es de 100 caracteres',
    valueMaxDestinationInput:
      "\\Amarilo\\Destino1\\TestAutomation\\lengththe100caracters\\input\\origen\\filesupdate\\loremIpsum\\istfswjdnsd",
    messageMaxDestinationInput:
      'La longitud máxima permitida para el "Destino" es de 100 caracteres',
  },

  configData: {
    valueInputRegex: "^.*\\.txt",
    valueLengthMinRegexInput: ".txt",
    valueLengthMaxRegexInput:
      "+*#$....-_=._:$$$#*][*#%$#%%&%$&!##!#*P**++^.*\\.txt",
    messageLengthMinRegexInput:
      'La longitud mínima permitida para el "Regex" es de 5 caracteres',
    messageLengthMaxRegexInput:
      'La longitud máxima permitida para el "Regex" es de 50 caracteres',
  },

  schedulePeriodicity: {
    titlePage: "Programar periodicidad cada:",
  },
};
