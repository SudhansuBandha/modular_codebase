class BaseResponseHandler{
  successResponse(res, data) {
    return res.status(200).json({ success: true, data });
  }

  errorResponse(res, message) {
    return res.status(500).json({ success: false, message });
  }
}

module.exports = BaseResponseHandler;