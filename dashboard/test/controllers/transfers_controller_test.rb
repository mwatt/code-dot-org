require 'test_helper'

class TransfersControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  setup do
    @teacher = create(:teacher)
    sign_in(@teacher)

    @word_section = create(:section, user: @teacher, login_type: 'word')
    @word_user_1 = create(:follower, section: @word_section).student_user

    @picture_section = create(:section, user: @teacher, login_type: 'picture')
    @picture_user_1 = create(:follower, section: @word_section).student_user
  end

  test "returns an error when student ids are not provided" do
    post :create, id: @picture_section.code
    assert_response 400
  end

  test "returns an error when the section id is invalid" do
    code = "QWERTY"
    post :create, id: code, student_ids: @word_user_1.id.to_s
    assert_response 404
  end

  test "returns an error when one of the student_ids is invalid" do
    student_ids = [@word_user_1.id, -100].join(',')
    post :create, id: @word_section.code, student_ids: student_ids
    assert_response 404
  end

  test "transferring without logging in fails" do
    sign_out(@teacher)
    post :create, id: @picture_section.code, student_ids: @word_user_1.id.to_s

    # Ergh, Devise will return a 302 instead of a 401 because of the way
    # this route is set up
    assert_response 302
  end

  test "you should only be able to transfer students who are currently in your section" do
    new_student = create(:student)
    post :create, id: @picture_section.code, student_ids: new_student.id
    assert_response 403
  end

  test "transferring to the same section does nothing" do
    post :create, id: @word_section.code, student_ids: @word_user_1.id.to_s
    assert Follower.exists?(student_user: @word_user_1, section: @word_section)
  end

  test "transferring a student to a section owned by a teacher the student "\
       "already follows causes the student to transfer sections under that teacher" do
    post :create, id: @picture_section.code, student_ids: @word_user_1.id.to_s
    assert_not Follower.exists?(student_user: @picture_user_1, section: @picture_section)
  end

  test "transferring to a new teacher causes a student to join the section" do
    new_teacher = create(:teacher)
    new_word_section = create(:section, user: new_teacher, login_type: 'word')

    post :create, id: new_word_section.code, student_ids: @word_user_1.id.to_s

    assert Follower.exists?(student_user: @word_user_1, section: new_word_section)
  end

  test "transferring to a new teacher does not modify existing sections for a student" do
    new_teacher = create(:teacher)
    new_word_section = create(:section, user: new_teacher, login_type: 'word')

    post :create, id: new_word_section.code, student_ids: @word_user_1.id.to_s

    assert Follower.exists?(student_user: @word_user_1, section: @word_section)
  end

  test "transferring a student with a messed up email succeeds" do
    @picture_user_1.update_attribute(:email, '')
    @picture_user_1.update_attribute(:hashed_email, '')

    post :create, id: @word_section.code, student_ids: @picture_user_1.id.to_s

    assert Follower.exists?(student_user: @picture_user_1, section: @word_section)
  end

  test "all students can be transferred successfully" do
    new_teacher = create(:teacher)
    new_section = create(:section, user: new_teacher, login_type: 'word')

    student_ids = [@word_user_1, @picture_user_1].map(&:id).join(',')
    post :create, id: new_section.code, student_ids: student_ids

    assert Follower.exists?(student_user: @word_user_1, section: new_section)
    assert Follower.exists?(student_user: @picture_user_1, section: new_section)
  end
end
