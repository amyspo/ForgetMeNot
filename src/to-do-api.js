// fetch and post logic nothing else

export async function fetcher(endpoint) {
  const response = await fetch(endpoint);
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }
  return json;
}

export async function sendDelete(identifier) {
  const response = await fetch(`/api/todos/${identifier}`, {
     method: 'DELETE',
    });
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json;
}


