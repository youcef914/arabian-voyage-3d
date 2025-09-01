// Simplified GeoJSON data for Arab countries
// This is a simplified version for demonstration - in production you'd use a proper GeoJSON file

export const arabCountriesGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "الجزائر",
        "nameEn": "Algeria",
        "iso3": "DZA",
        "code": "DZ"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-8.667611, 27.656426], [11.979548, 27.656426], [11.979548, 37.339632], [-8.667611, 37.339632], [-8.667611, 27.656426]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "البحرين",
        "nameEn": "Bahrain",
        "iso3": "BHR",
        "code": "BH"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [50.637772, 26.066700]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "جزر القمر",
        "nameEn": "Comoros",
        "iso3": "COM",
        "code": "KM"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [43.872219, -11.875001]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "جيبوتي",
        "nameEn": "Djibouti",
        "iso3": "DJI",
        "code": "DJ"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[41.66176, 10.929618], [43.416973, 10.929618], [43.416973, 12.706833], [41.66176, 12.706833], [41.66176, 10.929618]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "مصر",
        "nameEn": "Egypt",
        "iso3": "EGY",
        "code": "EG"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[24.696775, 21.725389], [36.87623, 21.725389], [36.87623, 31.667339], [24.696775, 31.667339], [24.696775, 21.725389]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "العراق",
        "nameEn": "Iraq",
        "iso3": "IRQ",
        "code": "IQ"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[38.795062, 29.061327], [48.567971, 29.061327], [48.567971, 37.380521], [38.795062, 37.380521], [38.795062, 29.061327]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "الأردن",
        "nameEn": "Jordan",
        "iso3": "JOR",
        "code": "JO"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[34.959999, 29.183401], [39.301169, 29.183401], [39.301169, 33.367668], [34.959999, 33.367668], [34.959999, 29.183401]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "الكويت",
        "nameEn": "Kuwait",
        "iso3": "KWT",
        "code": "KW"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[46.568713, 28.524353], [48.41514, 28.524353], [48.41514, 30.095282], [46.568713, 30.095282], [46.568713, 28.524353]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "لبنان",
        "nameEn": "Lebanon",
        "iso3": "LBN",
        "code": "LB"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[35.114956, 33.089886], [36.639081, 33.089886], [36.639081, 34.691619], [35.114956, 34.691619], [35.114956, 33.089886]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "ليبيا",
        "nameEn": "Libya",
        "iso3": "LBY",
        "code": "LY"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[9.391081, 19.508851], [25.150612, 19.508851], [25.150612, 33.168165], [9.391081, 33.168165], [9.391081, 19.508851]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "موريتانيا",
        "nameEn": "Mauritania",
        "iso3": "MRT",
        "code": "MR"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-17.066781, 14.715547], [-4.833828, 14.715547], [-4.833828, 27.298145], [-17.066781, 27.298145], [-17.066781, 14.715547]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "المغرب",
        "nameEn": "Morocco",
        "iso3": "MAR", 
        "code": "MA"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-13.168586, 27.662946], [-0.991750, 27.662946], [-0.991750, 35.922073], [-13.168586, 35.922073], [-13.168586, 27.662946]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "عُمان",
        "nameEn": "Oman",
        "iso3": "OMN",
        "code": "OM"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[51.999351, 16.645877], [59.836573, 16.645877], [59.836573, 26.387972], [51.999351, 26.387972], [51.999351, 16.645877]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "فلسطين",
        "nameEn": "Palestine",
        "iso3": "PSE",
        "code": "PS"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[34.216654, 31.216541], [35.684196, 31.216541], [35.684196, 33.277426], [34.216654, 33.277426], [34.216654, 31.216541]]]
      }
    },
    {
      "type": "Feature", 
      "properties": {
        "name": "قطر",
        "nameEn": "Qatar",
        "iso3": "QAT",
        "code": "QA"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[50.757813, 24.482764], [51.636669, 24.482764], [51.636669, 26.154722], [50.757813, 26.154722], [50.757813, 24.482764]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "السعودية",
        "nameEn": "Saudi Arabia", 
        "iso3": "SAU",
        "code": "SA"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[34.495118, 16.002082], [55.666851, 16.002082], [55.666851, 32.154284], [34.495118, 32.154284], [34.495118, 16.002082]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "الصومال", 
        "nameEn": "Somalia",
        "iso3": "SOM",
        "code": "SO"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[40.98105, -1.674868], [51.135406, -1.674868], [51.135406, 12.025301], [40.98105, 12.025301], [40.98105, -1.674868]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "السودان",
        "nameEn": "Sudan",
        "iso3": "SDN", 
        "code": "SD"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[21.827774, 8.685821], [38.41214, 8.685821], [38.41214, 22.232219], [21.827774, 22.232219], [21.827774, 8.685821]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "سوريا",
        "nameEn": "Syria",
        "iso3": "SYR",
        "code": "SY"
      },
      "geometry": {
        "type": "Polygon", 
        "coordinates": [[[35.727865, 32.310665], [42.349591, 32.310665], [42.349591, 37.319138], [35.727865, 37.319138], [35.727865, 32.310665]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "تونس",
        "nameEn": "Tunisia",
        "iso3": "TUN",
        "code": "TN" 
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[7.52448, 30.307556], [11.598278, 30.307556], [11.598278, 37.349994], [7.52448, 37.349994], [7.52448, 30.307556]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "الإمارات",
        "nameEn": "UAE",
        "iso3": "ARE",
        "code": "AE"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[51.579519, 22.633329], [56.396847, 22.633329], [56.396847, 26.084801], [51.579519, 26.084801], [51.579519, 22.633329]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "اليمن",
        "nameEn": "Yemen",
        "iso3": "YEM",
        "code": "YE"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[42.232406, 12.111466], [53.108864, 12.111466], [53.108864, 19.000033], [42.232406, 19.000033], [42.232406, 12.111466]]]
      }
    }
  ]
};