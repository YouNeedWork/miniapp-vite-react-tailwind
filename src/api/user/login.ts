import { API_BASE_URL } from "../../constant/config";

export async function login(initData: string, referrerCode: string) {
    const response = await fetch(`${API_BASE_URL}/user`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        init_data: initData,
        referral: referrerCode,
      }),
    })
    const data = await response.json()
    return data
  }