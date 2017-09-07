class UserService {
  renderUserComponent(users) {
    const $userList = $(".user-list__wrap ul")

    $userList.empty()

    users.forEach(function (user, idx) {
      const userComponent = $("#user__wrap").clone()

      userComponent.find('.user__rank').text("#" + (idx + 1))
      userComponent.find('img').attr('src', user.profile.picture)
      userComponent.find('.user__name').text(user.profile.name)
      userComponent.find('.user__score').text(user.score)

      $userList.append(userComponent)
    })
  }
}

export const userSvc = new UserService()
