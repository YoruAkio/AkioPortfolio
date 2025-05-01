export default async function handler(req, res) {
  try {
    // Using GitHub GraphQL API to fetch pinned repositories
    const query = `
      query {
        user(login: "YoruAkio") {
          pinnedItems(first: 3, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                homepageUrl
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 4) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.GITHUB_TOKEN}`
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    
    const data = await response.json();
    
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    
    const pinnedRepos = data.data.user.pinnedItems.nodes;
    
    res.status(200).json(pinnedRepos);
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
}