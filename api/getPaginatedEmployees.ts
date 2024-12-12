import axios from "axios";

interface IGetPaginatedEmployeesParams {
  page: number;
  pageSize?: number;
  sort?: string;
  filters?: string;
  search?: string;
}

export const getPaginatedEmployees = async ({
  page,
  pageSize = 10,
  sort = "",
  filters = "",
  search = "",
}: IGetPaginatedEmployeesParams): Promise<any[]> => {

  return [
      {
          "id": 1,
          "nombre": "Rosanna",
          "apellido": "Nitsche",
          "mail": "rosannanitsche@gmail.com",
          "telefono": "56965947740",
          "rut": "6.861.068-0"
      },
      {
          "id": 2,
          "nombre": "Felipe",
          "apellido": "Bravo",
          "mail": "ops@ruuf.solar",
          "telefono": "56966768812",
          "rut": ""
      },
      {
          "id": 3,
          "nombre": "Felipe",
          "apellido": "Bravo",
          "mail": "ops@ruuf.solar",
          "telefono": "56966768812",
          "rut": ""
      },
      {
          "id": 4,
          "nombre": "Felipe",
          "apellido": "Bravo",
          "mail": "ops@ruuf.solar",
          "telefono": "56966768812",
          "rut": ""
      },
      {
          "id": 5,
          "nombre": "Sebastián",
          "apellido": "Rojas",
          "mail": "corporacionlasamapolas@gmail.com",
          "telefono": "56951068869",
          "rut": "65.154.676-1"
      },
      {
          "id": 6,
          "nombre": "Consuelo",
          "apellido": "Corta",
          "mail": "consuelo@korta.cl",
          "telefono": "56998176229",
          "rut": "8.387.850-9"
      },
      {
          "id": 7,
          "nombre": "Javier",
          "apellido": "Torregrosa",
          "mail": "javier.torregrosa@canamerica.cl",
          "telefono": "56989820013",
          "rut": "76.326.499-8"
      },
      {
          "id": 8,
          "nombre": "Wouter",
          "apellido": "Overmeire",
          "mail": "info@panescofood.cl",
          "telefono": "56977145590",
          "rut": "76.863.092-5"
      },
      {
          "id": 9,
          "nombre": "Matías",
          "apellido": "Guajardo",
          "mail": "guajardo.matias@gmail.com",
          "telefono": "56998226977",
          "rut": "10.675.257-5"
      },
      {
          "id": 10,
          "nombre": "Hernán",
          "apellido": "Catalán",
          "mail": "herencata@gmail.com",
          "telefono": "56977937699",
          "rut": "7.820.095-2"
      },
      {
          "id": 11,
          "nombre": "Gonzalo",
          "apellido": "Seriche",
          "mail": "gonzalo.seriche@gmail.com",
          "telefono": "56933790643",
          "rut": "76.908.194-1"
      },
      {
          "id": 12,
          "nombre": "Miguel",
          "apellido": "Abusleme",
          "mail": "gerencia@digicolor.cl",
          "telefono": "56982303940",
          "rut": "78.561.310-4"
      },
      {
          "id": 13,
          "nombre": "Andrés",
          "apellido": "Larach",
          "mail": "andres.larach@mi.cl",
          "telefono": "56990794369",
          "rut": "7.626.636-0"
      },
      {
          "id": 14,
          "nombre": "Mauricio",
          "apellido": "Lazcano",
          "mail": "lazcanoherrera_1@yahoo.es",
          "telefono": "56985494681",
          "rut": "10.631.066-1"
      },
      {
          "id": 15,
          "nombre": "Cristina",
          "apellido": "Lagos",
          "mail": "cristina.lagos@grupolagos.cl",
          "telefono": "56978507779",
          "rut": "7.367.533-2"
      },
      {
          "id": 16,
          "nombre": "Juan Roberto",
          "apellido": "Lyon",
          "mail": "jlyon@maxagro.cl",
          "telefono": "56993378581",
          "rut": "4.603.484-8"
      },
      {
          "id": 17,
          "nombre": "Carlos",
          "apellido": "Banda",
          "mail": "cbanda@crillon.cl",
          "telefono": "56934689917",
          "rut": "99.592.200-2"
      },
      {
          "id": 18,
          "nombre": "Arnaldo",
          "apellido": "Sandoval",
          "mail": "aasandov@hotmail.com",
          "telefono": "56932487621",
          "rut": "15.706.371-5"
      },
      {
          "id": 19,
          "nombre": "Jorge",
          "apellido": "Ramirez",
          "mail": "jramirez@jrp.cl",
          "telefono": "56998884203",
          "rut": "77.387.860-9"
      },
      {
          "id": 20,
          "nombre": "Guillermo",
          "apellido": "Briones",
          "mail": "gbc@ne.cl",
          "telefono": "56998261873",
          "rut": "7.069.155-8"
      },
      {
          "id": 21,
          "nombre": "Pedro Pablo",
          "apellido": "Silva",
          "mail": "ppsilva@colbun.cl",
          "telefono": "56966494295",
          "rut": "10.353.901-3"
      },
      {
          "id": 22,
          "nombre": "Claudia Andrea",
          "apellido": "Yévenes Hervera",
          "mail": "fschmidtk@hotmail.com",
          "telefono": "56992547388",
          "rut": "78.383.350-6"
      },
      {
          "id": 23,
          "nombre": "Ester",
          "apellido": "Fernández",
          "mail": "titamcfm@gmail.com",
          "telefono": "56992222241",
          "rut": "5.613.716-5"
      },
      {
          "id": 24,
          "nombre": "Leopoldo",
          "apellido": "Dominichetti",
          "mail": "ldominichetti@gmail.com",
          "telefono": "56982487488",
          "rut": "76.079.830-4"
      },
      {
          "id": 25,
          "nombre": "Gerardo",
          "apellido": "García",
          "mail": "gegarcia@ug.uchile.cl",
          "telefono": "56965891342",
          "rut": "10.534.546-1"
      },
      {
          "id": 26,
          "nombre": "Alejandro",
          "apellido": "Astudillo",
          "mail": "ar.astudillo@gmail.com",
          "telefono": "56983737076",
          "rut": "13.172.411-K"
      },
      {
          "id": 27,
          "nombre": "Jorge",
          "apellido": "Acevedo",
          "mail": "jorge.acevedomunoz@gmail.com",
          "telefono": "56977754609",
          "rut": "12.648.679-0"
      },
      {
          "id": 28,
          "nombre": "Anis",
          "apellido": "Kahn Sadeghpour",
          "mail": "aniskhan@gmail.com",
          "telefono": "56999393503",
          "rut": "21.986.719-0"
      },
      {
          "id": 29,
          "nombre": "Rodrigo",
          "apellido": "Tapia",
          "mail": "rodrigotapiac@gmail.com",
          "telefono": "56997890272",
          "rut": "13.028.537-6"
      },
      {
          "id": 30,
          "nombre": "Ignacio",
          "apellido": "Labarca",
          "mail": "ignacio@labarca.cl",
          "telefono": "56984065841",
          "rut": "77.614.292-1"
      },
      {
          "id": 31,
          "nombre": "Julio",
          "apellido": "Oyarzún",
          "mail": "julio.oyarzun@yahoo.com",
          "telefono": "56948808350",
          "rut": "7.431.342-6"
      },
      {
          "id": 32,
          "nombre": "Manuel",
          "apellido": "Opazo",
          "mail": "manuelopazo@opazotelecom.cl",
          "telefono": "56993272526",
          "rut": "76.415.430-4"
      },
      {
          "id": 33,
          "nombre": "Guillermo",
          "apellido": "Martínez",
          "mail": "cabanasriopescado@gmail.com",
          "telefono": "56995559028",
          "rut": "76.575.833-5"
      },
      {
          "id": 34,
          "nombre": "Pamela",
          "apellido": "Riquelme",
          "mail": "priquelmeb@gmail.com",
          "telefono": "56948784526",
          "rut": "13.908.782-8"
      },
      {
          "id": 35,
          "nombre": "Diego",
          "apellido": "Undurraga",
          "mail": "diegoundurrag@gmail.com",
          "telefono": "56972596347",
          "rut": "96.518.000-1"
      },
      {
          "id": 36,
          "nombre": "Guillermo",
          "apellido": "Undurraga",
          "mail": "guillermo.undurraga@paramountgruas.com",
          "telefono": "56972596347",
          "rut": ""
      },
      {
          "id": 37,
          "nombre": "Pablo",
          "apellido": "Labra",
          "mail": "tecnologiconuevohorizonte@gmail.com",
          "telefono": "56991652077",
          "rut": "65.152.311-7"
      },
      {
          "id": 38,
          "nombre": "Emir",
          "apellido": "Chequela",
          "mail": "emir.cheuquelaf@gmail.com",
          "telefono": "56993437803",
          "rut": "16.495.470-6"
      },
      {
          "id": 39,
          "nombre": "Cristian",
          "apellido": "Jeldes",
          "mail": "vodcon@gmail.com",
          "telefono": "56976664269",
          "rut": "18.407.394-3"
      },
      {
          "id": 40,
          "nombre": "Arturo",
          "apellido": "Errazuriz",
          "mail": "arturoerrazuriz@gmail.com",
          "telefono": "56994897698",
          "rut": "16.208.255-8"
      },
      {
          "id": 41,
          "nombre": "Enrique",
          "apellido": "Piraino",
          "mail": "epiraino@gmail.com",
          "telefono": "56997825769",
          "rut": "77.734.488-9"
      },
      {
          "id": 42,
          "nombre": "Francisco",
          "apellido": "Gutierrez",
          "mail": "fgutierrezph@gmail.com",
          "telefono": "56998202903",
          "rut": "7.031.728-1"
      },
      {
          "id": 43,
          "nombre": "Christoph",
          "apellido": "Schuck",
          "mail": "chris@almendraslitral.cl",
          "telefono": "5699990777",
          "rut": "6.978.145-4"
      },
      {
          "id": 44,
          "nombre": "Pamela",
          "apellido": "Zelada",
          "mail": "pamezelada@gmail.com",
          "telefono": "56987776127",
          "rut": "15.337.513-5"
      },
      {
          "id": 45,
          "nombre": "Hernán",
          "apellido": "Castillo",
          "mail": "hernan.castillo.o@gmail.com",
          "telefono": "56961256010",
          "rut": "16.967.785-9"
      },
      {
          "id": 46,
          "nombre": "Juan Carlos",
          "apellido": "García-Huidobro",
          "mail": "juancarlos@jcghb.com",
          "telefono": "56956682637",
          "rut": "8.663.564-K"
      },
      {
          "id": 47,
          "nombre": "Juan Pablo",
          "apellido": "Laguna",
          "mail": "jplagunar@gmail.com",
          "telefono": "56954052375",
          "rut": "76.829.797-5"
      },
      {
          "id": 48,
          "nombre": "Marcos",
          "apellido": "Allende",
          "mail": "mav@skava.cl",
          "telefono": "56992240594",
          "rut": "79.694.120-0"
      },
      {
          "id": 49,
          "nombre": "Raimundo",
          "apellido": "Silva",
          "mail": "raimundo.silva88@gmail.com",
          "telefono": "56957625371",
          "rut": "16.936.014-6"
      },
      {
          "id": 50,
          "nombre": "Álvaro",
          "apellido": "Paredes",
          "mail": "alvaro.paredes@torreon.cl",
          "telefono": "56993496972",
          "rut": "78.011.160-7"
      },
      {
          "id": 51,
          "nombre": "Francisco",
          "apellido": "Pizarro",
          "mail": "fpizarro@grupoportia.cl",
          "telefono": "56998744498",
          "rut": "76.506.850-9"
      },
      {
          "id": 52,
          "nombre": "Alberto",
          "apellido": "Morales",
          "mail": "albertomorales@exportadorafortaleza.com",
          "telefono": "56991292646",
          "rut": "78.518.510-2"
      },
      {
          "id": 53,
          "nombre": "Pablo",
          "apellido": "Carvajal",
          "mail": "pcarvajal24@gmail.com",
          "telefono": "56976422263",
          "rut": "15.455.956-6"
      },
      {
          "id": 54,
          "nombre": "Pilar",
          "apellido": "Abarca",
          "mail": "mariapilar.abarca@gmail.com",
          "telefono": "56999441688",
          "rut": "76.358.186-1"
      },
      {
          "id": 55,
          "nombre": "Sergio",
          "apellido": "Betancourt",
          "mail": "sergiobetancourtcabrera@gmail.com",
          "telefono": "56987907484",
          "rut": "15.744.788-2"
      },
      {
          "id": 56,
          "nombre": "Felipe",
          "apellido": "Arriagada",
          "mail": "farriags@gmail.com",
          "telefono": "56966664945",
          "rut": "76.954.731-2"
      },
      {
          "id": 57,
          "nombre": "Jaime",
          "apellido": "Videla",
          "mail": "jaime_videla@hotmail.com",
          "telefono": "56932268565",
          "rut": "8.256.594-9"
      },
      {
          "id": 58,
          "nombre": "Juan José",
          "apellido": "Piriz",
          "mail": "jjpiriz@delabarrabogados.cl",
          "telefono": "56998841185",
          "rut": "16.657.659-8"
      },
      {
          "id": 59,
          "nombre": "Pedro Pablo",
          "apellido": "Cuevas",
          "mail": "pcuevaslarrain@gmail.com",
          "telefono": "56992009721",
          "rut": "6.404.209-2"
      },
      {
          "id": 60,
          "nombre": "Arturo",
          "apellido": "Grez",
          "mail": "agrez3@gmail.com",
          "telefono": "56949283850",
          "rut": "17.701.592-K"
      },
      {
          "id": 61,
          "nombre": "Javier",
          "apellido": "de la Maza",
          "mail": "jdelamaza@mailpersonal.cl",
          "telefono": "56976688464",
          "rut": "12.661.606-6"
      },
      {
          "id": 62,
          "nombre": "Rubén",
          "apellido": "Marchant",
          "mail": "rmarchant@alemana.cl",
          "telefono": "56981891691",
          "rut": "8.951.158-5"
      },
      {
          "id": 63,
          "nombre": "José Miguel",
          "apellido": "Arriagada",
          "mail": "jarriagg@gmail.com",
          "telefono": "56977640103",
          "rut": "19.475.858-8"
      },
      {
          "id": 64,
          "nombre": "Mario",
          "apellido": "García",
          "mail": "garciagastigar@yahoo.com",
          "telefono": "56998427778",
          "rut": "6.240.831-6"
      },

  ];

  const params = {
    page,
    page_size: pageSize,
    sort,
    filters,
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clients/get_paginated_clients`,
      {
        headers: { "Content-Type": "application/json" },
        params
      }
    );
    return response.data;
  } catch (error) {
    console.log("Failed to fetch");
    return [];
  }
}