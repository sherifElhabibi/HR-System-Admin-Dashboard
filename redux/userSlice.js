import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;
export const fetchAsyncUser = createAsyncThunk(
  'user/fetchAsyncUser',
  async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.get(BASE_URL, config).then((response) => {
      return response.data;
    });
  }
);

export const fetchAsyncUpdatedUser = createAsyncThunk(
  'user/fetchAsyncUpdatedUser',

  async (token, name, email) => {
    console.log('token', token, 'name', name, 'email', email);
    // const headers = { Authorization: `Bearer ${authToken}` };
    // const response = await axios.patch(url, newData, { headers });

    // var data = JSON.stringify({ email: email, first_name: name });
    // var config = {
    //   method: 'patch',
    //   maxBodyLength: Infinity,
    //   url: 'https://ultimate.abuzeit.com/users/me',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlNjM2MjVkLTg2NGEtNDc1Yi04MjAxLTc4YmU1YTk2MWQyZCIsInJvbGUiOiI3OGMyOWRkMC1iNThkLTQ1OWEtODIzNi03ZjFhOWIzZWI2ODMiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTY3NjgwNjEzNywiZXhwIjoxNjc2ODA3MDM3LCJpc3MiOiJkaXJlY3R1cyJ9.ki1gV6V-vR_UMYwxYQ-Ep-5PNLRx9f_y5AUQ8VMse-o',
    //     'Content-Type': 'application/json',
    //   },
    //   data: data,
    // };
    // axios(config)
    //   .then(function (response) {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    fetch('https://ultimate.abuzeit.com/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        email: email,
        first_name: name,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => Promise.all([response, response.json()]))
      .then(([response, json]) => {
        console.log('response', json.data);

        if (!response.ok) {
          // We should get a 200 (OK) status code if everything is fine/working
          throw Error(
            `Respsonse status ${response.status} (${response.statusText}): ${json.message}`
          );
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
);
//   if (response.status === 200) {
//     localStorage.setItem("token", data.token)
//     return { ...data, username: name, email: email }
//   } else {
//     return thunkAPI.rejectWithValue(data)
//   }
//   async (token, name, email) => {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         email: email,
//         first_name: name,
//       }),
//     };
//     return axios.patch(BASE_URL, config).then((response) => {
//       return response.data;
//     });
//   }
// );

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncUser.pending, () => {
      console.log('Pending');
    });
    builder.addCase(fetchAsyncUser.fulfilled, (state, action) => {
      console.log('Fetched Successfully');
      return { ...state, user: action.payload };
    });
    builder.addCase(fetchAsyncUser.rejected, () => {
      console.log('Rejected');
    });

    builder.addCase(fetchAsyncUpdatedUser.pending, () => {
      console.log('Pending');
    });
    builder.addCase(fetchAsyncUpdatedUser.fulfilled, (state, action) => {
      console.log('Fetched Successfully');
      return { ...state, user: action.payload };
    });
    builder.addCase(fetchAsyncUpdatedUser.rejected, () => {
      console.log('Rejected');
    });
  },
});

export const getUser = (state) => state.user.user;

export default userSlice.reducer;
