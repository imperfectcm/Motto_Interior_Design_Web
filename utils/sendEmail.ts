import { FormData } from '@/components/ContactUsForm';


export async function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';

  try {
    const res = await fetch(apiEndpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const resData = await res.json()
      alert(resData.message);
      return
    }
  } catch (error) {
    alert(error);
  } finally{
    window.location.href='/'
  }

}