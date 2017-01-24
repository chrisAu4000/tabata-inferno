import {curry} from 'ramda'
import Validation from 'data.either'

const User = Validation.of(curry((name, eMail, password, verification) =>
  ({name, eMail, password, verification})
))

export default User
