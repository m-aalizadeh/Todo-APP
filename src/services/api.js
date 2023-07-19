const BASE_URL = "http://localhost:8080/app/v1/";
const user = JSON.parse(localStorage.getItem("user"));

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
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  postRequest = async (endpoint, body) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (user?.accessToken) {
        headers = { ...headers, Authorization: `Bearer ${user.accessToken}` };
      }
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      const finalResponse = { data: responseJson, status: response.status };

      //   if (response.status === 401) {
      //     deleteUserInfo();
      //     this.accessToken = undefined;
      //     Actions.auth();
      //   }

      return responseJson;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  patchRequest = async (endpoint, body, queryParams) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${BASE_URL}${endpoint}/${queryParams}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
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
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`${BASE_URL}${endpoint}/${queryParams}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
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
