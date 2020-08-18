import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const GantiPassword = () => import('@/views/GantiPassword')
const Profile = () => import('@/views/Profile')

// Pengguna
const Users = () => import('@/views/users/Users')
const CreateUser = () => import('@/views/users/Create')
const EditUser = () => import('@/views/users/Edit')
const Roles = () => import('@/views/roles/Roles')
const KategoriBerita = () => import('@/views/kategori_berita/KategoriBerita')
const Berita = () => import('@/views/berita/Berita')
const CreateBerita = () => import('@/views/berita/Create')
const EditBerita = () => import('@/views/berita/Edit')
const Login = () => import('@/views/auth/Login')
const Admin = () => import('@/views/admin/Admin')
const EditAdmin = () => import('@/views/admin/Edit')
const ShowAdmin = () => import('@/views/admin/Show')
const Guru = () => import('@/views/dataguru/Guru')
const ShowGuru = () => import('@/views/dataguru/Show')
const DetailHistory = () => import('@/views/dataguru/DetailHistory')
const DetailHistorySiswa = () => import('@/views/datasiswa/DetailHistory')
const Siswa = () => import('@/views/datasiswa/Siswa')
const ShowSiswa = () => import('@/views/datasiswa/Show')
const Verifikasi = () => import('@/views/verifikasiakun/Verifikasi')
const DetailVerifikasiGuru = () => import('@/views/verifikasiakun/ShowGuru')
const DetailVerifikasiSiswa = () => import('@/views/verifikasiakun/ShowSiswa')

//guru
const KategoriKelas = () => import('@/views/guru/kategori_kelas/KategoriKelas')
const Kelas = () => import('@/views/guru/kelas/Kelas')
const MataPelajaran = () => import('@/views/guru/mata_pelajaran/MataPelajaran')
const JenisHarga = () => import('@/views/guru/jenis_harga/JenisHarga')

// Support
const Schools = () => import('@/views/support/schools/School')
const CreateSchools =  () => import('@/views/support/schools/Create')
const EditSchools =  () => import('@/views/support/schools/Edit')

const Provinces = () => import('@/views/support/provinces/Provinces')

const Keahlian = () => import('@/views/support/keahlian/Keahlian')

const Pekerjaan = () => import('@/views/support/pekerjaan/Pekerjaan')

const Regencies = () => import('@/views/support/regencies/Regencies')

const Districts = () => import('@/views/support/districts/Districts')

const Villages = () => import('@/views/support/villages/Villages')

const Genders = () => import('@/views/support/genders/Genders')

const Religions = () => import('@/views/support/religions/Religions')

const Educations = () => import('@/views/support/educations/Educations')

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: {auth:true}
        },
        {
          path: 'ganti-password',
          name: 'Ganti Password',
          component: GantiPassword,
          meta: {auth:true}
        },
        {
          path: 'roles',
          name: 'Roles',
          component: Roles,
          meta: {auth:true}
        },
        {
          path: 'users',
          redirect: 'users',
          name: 'Users',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'Data Users',
              props: true,
              component: Users,
              meta: {auth:true}
            },
            {
              path: 'create',
              name: 'Tambah User',
              component: CreateUser,
              meta: {auth:true}
            },
            {
              path: 'edit/:id',
              name: 'Edit User',
              component: EditUser,
              meta: {auth:true}
            },
          ]
        },
        {
          path: 'hak-akses/admin',
          name: 'Data Admin',
          component: Admin,
          meta: {auth:true}
        },
        {
          path: 'admin/update/:id',
          name: 'Edit Admin',
          component: EditAdmin,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'admin/show/:id',
          name: 'Show Admin',
          component: ShowAdmin,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'hak-akses/guru',
          name: 'Data Guru',
          component: Guru,
          meta: {auth:true}
        },
        {
          path: 'guru/show/:id',
          name: 'Show Guru',
          component: ShowGuru,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'history/detail/:id',
          name: 'Detail History',
          component: DetailHistory,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'history/detail/siswa/:id',
          name: 'Detail History Siswa',
          component: DetailHistorySiswa,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'hak-akses/siswa',
          name: 'Data Siswa',
          component: Siswa,
          meta: {auth:true}
        },
        {
          path: 'siswa/show/:id',
          name: 'Show Siswa',
          component: ShowSiswa,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'verifikasi',
          name: 'Verifikasi Akun',
          component: Verifikasi,
          meta: {auth:true}
        },
        {
          path: 'verifikasi/detail-guru/:id',
          name: 'Detail Verifikasi Guru',
          component: DetailVerifikasiGuru,
          props: true,
          meta: {auth:true}
        },
        {
          path: 'verifikasi/detail-siswa/:id',
          name: 'Detail Verifikasi Siswa',
          component: DetailVerifikasiSiswa,
          props: true,
          meta: {auth:true}
        },
        // {
        //   path: 'verifikasi',
        //   redirect: 'verifikasi/guru',
        //   name: 'Verifikasi',
        //   component: {
        //     render (c) { return c('router-view') }
        //   },
        //   children: [
        //     {
        //       path: 'guru',
        //       name: 'Verifikasi Guru',
        //       component: VerifikasiGuru,
        //       meta: {auth:true}
        //     },
        //     {
        //       path: 'guru/details/:id',
        //       name: 'Detail Verifikasi Guru',
        //       props: true,
        //       component: DetailVerifikasiGuru,
        //       meta: {auth:true}
        //     },
        //     {
        //       path: 'siswa',
        //       name: 'Data Siswa',
        //       component: VerifikasiSiswa,
        //       meta: {auth:true}
        //     },
        //     {
        //       path: 'siswa/detail/:id',
        //       name: 'Detail Verifikasi Siswa',
        //       props: true,
        //       component: DetailVerifikasiSiswa,
        //       meta: {auth:true}
        //     },
        //   ]
        // },
        {
          path: 'berita',
          redirect: 'berita',
          name: 'Berita',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'kategori-berita',
              name: 'Data Kategori Berita',
              props: true,
              component: KategoriBerita,
              meta: {auth:true}
            },
            {
              path: '/',
              name: 'Data Berita',
              component: Berita,
              meta: {auth:true}
            },
            {
              path: 'create',
              name: 'Tambah Berita',
              component: CreateBerita,
              meta: {auth:true}
            },
            {
              path: 'edit/:id',
              name: 'Edit Berita',
              component: EditBerita,
              meta: {auth:true}
            },
          ]
        },
        {
          path: 'kategori-kelas',
          name: 'Kategori Kelas',
          component: KategoriKelas,
          meta: {auth:true}
        },
        {
          path: 'kelas',
          name: 'Kelas',
          component: Kelas,
          meta: {auth:true}
        },
        {
          path: 'mata-pelajaran',
          name: 'Mata Pelajaran',
          component: MataPelajaran,
          meta: {auth:true}
        },
        {
          path: 'jenis-harga',
          name: 'Jenis Harga',
          component: JenisHarga,
          meta: {auth:true}
        },
        {
          path: 'support/wilayah-indonesia',
          redirect: 'support/wilayah-indonesia/provinsi',
          name: 'Wilayah Indonesia',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'provinsi',
              name: 'Provinsi',
              component: Provinces,
              meta: {auth:true}
            },
            {
              path: 'kota-kabupaten',
              name: 'Kota/Kabupaten',
              component: Regencies,
              meta: {auth:true}
            },
            {
              path: 'kecamatan',
              name: 'Kecamatan',
              component: Districts,
              meta: {auth:true}
            },
            {
              path: 'desa',
              name: 'Desa',
              component: Villages,
              meta: {auth:true}
            },
          ]
        },
        {
          path: 'support/school',
          redirect: 'support/school',
          name: 'Sekolah',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '/',
              name: 'Data Sekolah',
              component: Schools,
              meta: {auth:true}
            },
            {
              path: 'create',
              name: 'Tambah Data Sekolah',
              component: CreateSchools,
              meta: {auth:true}
            },
            {
              path: 'edit/:id',
              name: 'Edit Data Sekolah',
              component: EditSchools,
              meta: {auth:true}
            },
          ]
        },
        {
          path: 'support/lainnya',
          redirect: 'support/lainnya/agama',
          name: 'Lainnya',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'agama',
              name: 'Agama',
              component: Religions,
              meta: {auth:true}
            },
            {
              path: 'genders',
              name: 'Genders',
              component: Genders,
              meta: {auth:true}
            },
            {
              path: 'pendidikan',
              name: 'Pendidikan',
              component: Educations,
              meta: {auth:true}
            },
            {
              path: 'pekerjaan',
              name: 'Pekerjaan',
              component: Pekerjaan,
              meta: {auth:true}
            },
            {
              path: 'keahlian',
              name: 'Keahlian',
              component: Keahlian,
              meta: {auth:true}
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth:false}
    }
  ]
}

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)){
    if(store.getters['auth/guest']){
      next({
        path:'/login'
      })
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
