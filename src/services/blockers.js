export const getBlockers = async () => {
  const response = await fetch('https://speedy-standup.herokuapp.com/get-all');
  const blockers = await response.json();
  return blockers;
}

export const deleteBlocker = async (blockerId) => {
  try {
    const response = await fetch(`https://speedy-standup.herokuapp.com/blocker/${blockerId}`, { method: 'DELETE' });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export const createBlocker = async ({ name, blocker, ticket }) => {
  const body = JSON.stringify({ name: name, blocker: blocker, ticket: ticket });
  try {
    const response = fetch("https://speedy-standup.herokuapp.com/create", {
      body,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST"
    })
    return response;
  } catch (err) {
    console.err(err);
  }
}