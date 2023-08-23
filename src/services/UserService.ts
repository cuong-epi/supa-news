import axios from "axios";

export default class UserService {
  searchUsers = async (data: any) => {
    const { data: response } = await axios.post(`/users/search`, data);
    return response;
  }

  lockUser = async (data: any) => {
    const { data: response } = await axios.put(`/users/lockuser`, data);
    return response;
  }

  unlockUser = async (data: any) => {
    const { data: response } = await axios.put(`/users/unlockuser`, data);
    return response;
  }

  getTopRefer = async (pageIndex: number, pageSize: number) => {
    const { data: response } = await axios.get(`/users/gettoprefer?page_index=${pageIndex}&page_size=${pageSize}`);
    return response;
  }

  getTotalUsersCheckInByDateRange = async (startDate: string, endDate: string) => {
    const { data: response } = await axios.get(`/users/gettotaluserscheckinbydaterange?start_date=${startDate}&end_date=${endDate}`);
    return response;
  }

  getTotalUsersRegisteredByDateRange = async (startDate: string, endDate: string) => {
    const { data: response } = await axios.get(`/users/gettotalusersregisteredbydaterange?start_date=${startDate}&end_date=${endDate}`);
    return response;
  }

  getTotalUsersJoinPublicChannelByDateRange = async (startDate: string, endDate: string) => {
    const { data: response } = await axios.get(`/users/gettotalusersjoinpublicchannelbydaterange?start_date=${startDate}&end_date=${endDate}`);
    return response;
  }
}
