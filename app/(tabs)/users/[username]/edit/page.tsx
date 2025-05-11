import EditForm from "@/components/edit-form";
import { getEditUser } from "@/service/editServise";

export const metadata = {
	title: "Profile Edit",
}

export default async function Edit() {
	const user = await getEditUser();
    return (
        <div className="pt-8 w-md mx-auto">
			<EditForm initialUser={{id:user?.id!, email:user?.email!, username:user?.username!, bio:user?.bio ?? ''}}/>
        </div>
    );
}
