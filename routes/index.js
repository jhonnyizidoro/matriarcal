const router = require('express-promise-router')()
const { checkAuth } = require('../app/Middleware')

const { getCitiesByState } = require('../app/Controllers/CityController')
const { uploadGirlImage } = require('../app/Controllers/GirlImageController')
const { renderLoginPage, login, logout } = require('../app/Controllers/AuthController')
const {
	renderHomePage,
	sendSitemap,
	render404Page,
	render500Page,
} = require('../app/Controllers/SiteController')
const {
	renderContactPage,
	insertContact,
	renderContactsPage,
	toggleContactRead,
} = require('../app/Controllers/ContactController')
const {
	renderCommentPage,
	insertComment,
	renderCommentsPage,
	toggleCommentApproval,
	toggleCommentStatus,
} = require('../app/Controllers/CommentController')
const {
	renderGirlsPage,
	renderInsertGirlPage,
	insertGirl,
	renderUpdateGirlPage,
	updateGirl,
	renderGirlPage,
	toggleGirlStatus,
	renderInsertGirlSitePage,
	insertSiteGirl,
} = require('../app/Controllers/GirlController')


router.get('/admin/login', renderLoginPage)
router.post('/admin/login', login)
router.get('/admin/sair', logout)
router.get('/admin/matriarcas', checkAuth, renderGirlsPage)
router.get('/admin/matriarcas/inserir', checkAuth, renderInsertGirlPage)
router.post('/admin/matriarcas/inserir', checkAuth, insertGirl)
router.get('/admin/matriarcas/editar/:id', checkAuth, renderUpdateGirlPage)
router.post('/admin/matriarcas/editar', checkAuth, updateGirl)
router.get('/admin/matriarcas/status/:id', checkAuth, toggleGirlStatus)
router.get('/admin/testemunhos', checkAuth, renderCommentsPage)
router.get('/admin/testemunhos/aprovacao/:id', checkAuth, toggleCommentApproval)
router.get('/admin/testemunhos/status/:id', checkAuth, toggleCommentStatus)
router.get('/admin/contatos', checkAuth, renderContactsPage)
router.get('/admin/contatos/leitura/:id', checkAuth, toggleContactRead)

router.get(['/', '/acompanhantes-*'], renderHomePage)
router.get('/acompanhante/*/*-:id', renderGirlPage)
router.get('/contato', renderContactPage)
router.post('/contato', insertContact)
router.get('/seja-uma-matriarca', renderInsertGirlSitePage)
router.post('/seja-uma-matriarca', insertSiteGirl)
router.get('/testemunhe', renderCommentPage)
router.post('/testemunhe', insertComment)
router.get('/sitemap.xml', sendSitemap)

router.get('/api/cidades/:id', getCitiesByState)
router.post('/api/upload', checkAuth, uploadGirlImage)

router.get('*', render404Page)
router.use(render500Page)

module.exports = router