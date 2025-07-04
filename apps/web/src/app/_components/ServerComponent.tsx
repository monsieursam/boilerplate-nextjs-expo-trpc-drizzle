import { serverApi } from "@/trpc/server"
import { revalidatePath } from "next/cache"

const getUser = async () => {
  try {
    const data = await serverApi.example.get();
    return data || [];
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

const createUser = async (
  formData: FormData
) => {
  'use server'

  await serverApi.example.add({
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    email: formData.get('email') as string,
  })

  revalidatePath('/')
}

const deleteUser = async (id: string) => {
  await serverApi.example.remove({
    id,
  })

  revalidatePath('/')
}

const AddUserComponent = () => {
  return (
    <div>
      <form
        action={createUser}
      >
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
        />
        <button
          type="submit"
        >
          Add User
        </button>
      </form>
    </div>
  )
}

const DeleteUserComponent = ({ id }: { id: string }) => {
  return (
    <div>
      <form
        action={async () => {
          'use server'
          await deleteUser(id)
        }}
      >
        <button
          type="submit"
        >
          Delete User
        </button>
      </form>
    </div>
  )
}


export const ServerComponent = async () => {
  const data = await getUser();

  return (<div className="p-4 bg-blue-100 rounded-lg">
    <h2 className="text-lg font-semibold mb-2">Server Component</h2>
    {
      data?.map((item) => (
        <div key={item.id}>
          <p>{item.first_name}</p>
          <p>{item.last_name}</p>
          <p>{item.email}</p>
          <DeleteUserComponent id={item.id} />
        </div>
      ))
    }

    <AddUserComponent />

  </div>
  )

}
