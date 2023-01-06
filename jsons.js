// SCHEMA

// get (no json needed)
const request = {
    "id": 8,
    "scheme": {
      "name": "gsfgdsgs",
      "phases": "sme"
    },
    "thing": [
      {
        "id": 15,
        "schemaId": 8,
        "timestamps": {
          "phases": [
            {
              "position": 1,
              "name": "phaseX",
              "time": "1jun"
            },
            {
              "position": 2,
              "name": "phaseX",
              "time": "2jun"
            }
          ]
        }
      },
      {
        "id": 16,
        "schemaId": 8,
        "timestamps": {
          "phases": [
            {
              "position": 1,
              "name": "phaseX",
              "time": "1jun"
            },
            {
              "position": 2,
              "name": "phaseX",
              "time": "2jun"
            }
          ]
        }
      },
      {
        "id": 17,
        "schemaId": 8,
        "timestamps": {
          "phases": [
            {
              "position": 1,
              "name": "phaseX",
              "time": "1jun"
            },
            {
              "position": 2,
              "name": "phaseX",
              "time": "2jun"
            }
          ]
        }
      },
      {
        "id": 18,
        "schemaId": 8,
        "timestamps": {
          "phases": [
            {
              "position": 1,
              "name": "phaseX",
              "time": "1jun"
            },
            {
              "position": 2,
              "name": "phaseX",
              "time": "2jun"
            }
          ]
        }
      }
    ]
  }

// post
const onRequest = {
    "schemeData":{
        "name": "gsfgdsgs",
        "phases": [
            {
                "position": 1,
                "name": "phaseX",
            },
            {
                "position": 2,
                "name": "phaseX",
            }
        ]
    }
}

const onResponse = {
    "schemeData":{
        "name": "gsfgdsgs",
        "phases": [
            {
                "position": 1,
                "name": "phaseX",
            },
            {
                "position": 2,
                "name": "phaseX",
            }
        ]
    }
}// AND ADD STATUS SUCCESSFULLY SUBMITTED

// delete
onRequest = {
    "schemeId": 2
}



// THINGS
