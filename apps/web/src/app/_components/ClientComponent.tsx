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

      <div className="mt-4">
        <button
          onClick={() => {
            createMutation.mutate({
              first_name: 'John',
              last_name: 'Doe',
              email: 'johndoe@example.com',
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Calculate 5 + 3
        </button>
      </div>
    </div>
  );
}
