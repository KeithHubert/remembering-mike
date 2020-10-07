class PostsController < ApplicationController
    has_many_attached :pictures


    def index
        # set prefilters for search session if they exist
        # @reports = Report.get_reports(params["category"], session, current_user)
        render json: Post.all

    end

  # GET /api/v1/tech_reviews/:id/edit
  def edit
    #TODO: Adapt to api / edit view
    # @company = Company.find_by(id: session["active_company_id"]) || Company.first
    # tech_review = TechReview.find(params[:id])
    # render json: @company.build_tech_review_form_data(tech_review)
  end

  # POST /api/v1/tech_reviews
  def create
    @tech_review = TechReview.new(tech_review_params)
    @tech_review.requirement_id = params["requirement_id"]
    @tech_review.approved = "Pending"
    if @tech_review.save
      render json: {
        status: 200,
        message: "OK",
        tech_review: @tech_review
      }
    else
      render json: {
        status: 422,
        message: "Unprocessable Entity"
      }
    end
  end

  # PATCH /api/v1/tech_reviews/:id
  def update
    @tech_review = TechReview.find(params[:id])
    @tech_review.approved = params[:commit]
    if @tech_review.update(tech_review_params)
      # send email here
      @tech_review.send_rejection_alert
      render json: {
        status: 200,
        message: "OK",
        tech_review: @tech_review
      }
    else
      render json: {
        status: 422,
        message: "Unprocessable Entity"
      }
    end
  end

  private

  def post_params
    params.require(:body).permit(
      :name
    )
  end
end
