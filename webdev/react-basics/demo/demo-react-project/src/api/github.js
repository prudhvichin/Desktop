export async function getGithubContributions() {
    const response = await fetch(
        "https://github-contributions-api.jogruber.de/v4/prudhvichin"
    )

    return response.json()
}