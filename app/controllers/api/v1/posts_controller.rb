
module Api::V1
  class PostsController < ApplicationController

    has_many_attached :pictures

    def index
      @posts = Post.all
      render json: @posts
    end

    def show
      @posts = Post.find(params[:id])
      render json: @posts
    end

    def create
      @posts = Post.new(post_params)

      if @posts.save
        render json: @posts, status: :created
      else
        render json: @posts.errors, status: :unprocessable_entity
      end
    end

    def update
      @posts = Post.find(params[:id])
      if @posts.update(post_params)
        render json: @posts
      else
        render json: @posts.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @posts = Post.find(params[:id])
      @posts.destroy
    end
    ###############################################################
    private

    def post_params
      params
          .require(:post)
          .permit(:company, :position, :description)
    end

  end
end