export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Home',
        to: '/dashboard',
        auth: true,
        icon: 'cil-home',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Pengguna']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Akun',
        to: '/users',
        icon: 'cil-user'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Roles',
        to: '/roles',
        icon: 'cil-badge'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Data Admin',
        to: '/hak-akses/admin',
        icon: 'cil-puzzle'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Data Guru',
        to: '/hak-akses/guru',
        icon: 'cil-user-female'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Data Siswa',
        to: '/hak-akses/siswa',
        icon: 'cil-child'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Verifikasi Akun',
        to: '/verifikasi',
        icon: 'cil-clipboard',
        // items: [
        //   {
        //     name: 'Verifikasi Guru',
        //     to: '/verifikasi/guru'
        //   },
        //   {
        //     name: 'Verifikasi Siswa',
        //     to: '/verifikasi/siswa'
        //   },
        // ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Berita',
        route: '/berita',
        icon: 'cil-newspaper',
        items: [
          {
            name: 'Kategori Berita',
            to: '/berita/kategori-berita'
          },
          {
            name: 'Berita',
            to: '/berita'
          },
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Guru']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kategori Kelas',
        to: '/kategori-kelas',
        icon: 'cil-dialpad'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Kelas',
        to: '/kelas',
        icon: 'cil-storage'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Mata Pelajaran',
        to: '/mata-pelajaran',
        icon: 'cil-book'
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Jenis Harga',
        to: '/jenis-harga',
        icon: 'cil-money'
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['Support']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Sekolah',
        to: '/support/school',
        icon: 'cil-school'
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Wilayah Indonesia',
        route: '/wilayah-indonesia',
        icon: 'cil-flag-alt',
        items: [
          {
            name: 'Provinsi',
            to: '/support/wilayah-indonesia/provinsi'
          },
          {
            name: 'Kabupaten/Kota',
            to: '/support/wilayah-indonesia/kota-kabupaten'
          },
          {
            name: 'Kecamatan',
            to: '/support/wilayah-indonesia/kecamatan'
          },
          {
            name: 'Desa',
            to: '/support/wilayah-indonesia/desa'
          },
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Lainnya',
        route: '/support-lainnya',
        icon: 'cil-options',
        items: [
          {
            name: 'Agama',
            to: '/support/lainnya/agama'
          },
          {
            name: 'Genders',
            to: '/support/lainnya/genders'
          },
          {
            name: 'Pendidikan',
            to: '/support/lainnya/pendidikan'
          },
          {
            name: 'Pekerjaan',
            to: '/support/lainnya/pekerjaan'
          },
          {
            name: 'Keahlian',
            to: '/support/lainnya/keahlian'
          },
          
        ]
      },
    ]
  }
]