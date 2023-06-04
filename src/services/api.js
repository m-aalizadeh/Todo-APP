const BASE_URL = "http://localhost:8080/app/v1/";

class ApiHelper {
  //     private accessToken?: string;

  //   constructor() {
  //     this.accessToken = undefined;
  //   }

  //   setAccessToken = (accessToken: string) => {
  //     this.accessToken = accessToken;
  //   };

  //   getAccessToken = () => {
  //     return this.accessToken;
  //   };

  getAllRequest = async (endpoint, queryParams) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
        method: "GET",
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  postRequest = async (endpoint, body) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      const finalResponse = { data: responseJson, status: response.status };

      //   if (response.status === 401) {
      //     deleteUserInfo();
      //     this.accessToken = undefined;
      //     Actions.auth();
      //   }

      return finalResponse;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  patchRequest = async (endpoint, body, queryParams) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/${queryParams}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const responseJson = await response.json();
      const finalResponse = { data: responseJson, status: response.status };

      return finalResponse;
    } catch (error) {
      console.error(error);
    }
  };

  deleteRequest = async (endpoint, queryParams) => {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}/${queryParams}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();

      // if (response.status === 401) {
      //   deleteUserInfo();
      //   this.accessToken = undefined;
      //   Actions.auth();
      // }

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };
}

export const APIHelper = new ApiHelper();

export const commonFetch = async () => {};
