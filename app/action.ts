"use server";
export async function handleForm(prevState:any, formData:FormData){
	await new Promise((resolve) => setTimeout(resolve,3000));
	const data = {
		email: formData.get("email")?.toString() || '',
		username: formData.get("username")?.toString() || '',
		password: formData.get("password")?.toString() || '',

	}

	if(formData.get("password") !== '12345'){
		return {
			errors:["wrong password",],
			success: false,
			values: data
		};

	}else{
		return {
			errors:[],
			success: true,
		};
		
	}
};