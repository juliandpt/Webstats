export default function({ app }) {
  if (!localStorage.getItem('token')) {
    app.context.redirect('/admin/login')
  }
}