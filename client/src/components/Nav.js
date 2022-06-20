const Nav = () => {
    const liff = window.liff;
    const initialize = () => {
        liff.init(async (data) => {
            let profile = await liff.getProfile();
            this.setState({
                displayName: profile.displayName,
                userId: profile.userId,
                pictureUrl: profile.pictureUrl,
                statusMessage: profile.statusMessage
            });
        });
    }

    initialize()

    return (
        <div>
            hello nav
        </div>
    )
}

export default Nav;
