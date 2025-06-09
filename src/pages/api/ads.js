/**
 * API route to serve ads.txt file
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send('google.com, pub-8321717503736662, DIRECT, f08c47fec0942fa0');
}
