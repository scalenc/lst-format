export let Constants = {
  BEGIN_DOCUMENT: 'BD',
  END_DOCUMENT: 'ED',

  COMMENT: 'C',

  Header: {
    METRIC_MEASURE: 'SET_METRIC',
    IMPERIAL_MEASURE: 'SET_INCH',
  },

  Table: {
    BEGIN_PREFIX: 'BEGIN_',
    END_PREFIX: 'ENDE_',

    LINE_CONNECTOR: '*',
    FIELD_CONNECTOR: '-',
    STRING_SEPARATOR: "'",
    FIELD_SEPARATOR: ',',

    Count: {
      FIELDS_COUNT: 3,
      ID: 'ZA',
      ID_INDEX: 0,
      TARGET_ID_INDEX: 1,
      COUNT_INDEX: 2,
    },

    ColumnDescription: {
      FIELD_COUNT: 11,
      ID: 'MM',
      ID_INDEX: 0,
      COLUMN_ID_INDEX: 3,
      NAME_INDEX: 7,
      UNIT_INDEX: 9,
      VALUE_TYPE_INDEX: 10,
      TEXT_VALUE_TYPE: 'T',
      NUMBER_VALUE_TYPE: 'Z',
    },

    Data: {
      ID: 'DA',
      ID_INDEX: 0,

      BEGIN_ATTACHMENT: 'START_TEXT',
      END_ATTACHMENT: 'STOP_TEXT',
    },
  },
};
