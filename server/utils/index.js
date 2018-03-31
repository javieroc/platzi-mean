export const handleError = (error, res) => {
  res.status(500).json({
    message: 'Something went wrong!',
    error,
  });
};
