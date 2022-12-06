export const bearer = ({ extract: { body = 'access_token', query = 'access_token', header = 'Bearer' } = {
    body: 'access_token',
    query: 'access_token',
    header: 'Bearer'
} } = {
    extract: {
        body: 'access_token',
        query: 'access_token',
        header: 'Bearer'
    }
}) => (app) => app.inject((context) => ({
    get bearer() {
        const authorization = context.request.headers.get('Authorization');
        if (authorization?.startsWith(header))
            return authorization.slice(header.length + 1);
        // ? No Form-Encoded Body Parameter support atm, skip
        const q = context.query?.[query];
        if (q)
            return q;
    }
}));
export default bearer;
