'use client';

import { useExample } from '@/hooks/useExample';

export function ClientComponent() {
  const { data, createMutation, isLoading } = useExample();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Client Component</h2>
      {
        data?.map((item) => (
          <div key={item.id}>
            <p>{item.first_name}</p>
            <p>{item.last_name}</p>
            <p>{item.email}</p>
          </div>
        ))
      }

      <div>
        <form onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          await createMutation.mutate({
            first_name: formData.get('first_name') as string,
            last_name: formData.get('last_name') as string,
            email: formData.get('email') as string,
          });
        }}>
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
    </div>
  );
}
