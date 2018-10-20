module.exports = [{
    path: '/menu_manager',
    component: function (res, rej) {
        require(['/web/js/admin/menu_manager/menu_manager.js'], function (data) {
            res(data['menu_manager']);
        });
    },
    children: [
    		// ����Ա�˵�ά��
        {
            path: 'menu_manager/admin_menu_settings',
            component: function (res, rej) {
                require(['/web/js/admin/menu_manager/menu_manager.js'], function (data) {
                    res(data['admin_menu_settings']);
                });
            }
        },
    		// ��ʦ�˵�ά��
        {
            path: 'menu_manager/teacher_menu_settings',
            component: function (res, rej) {
                require(['/web/js/admin/menu_manager/menu_manager.js'], function (data) {
                    res(data['admin_menu_settings']);
                });
            }
        },
        // ѧ���˵�ά��
        {
            path: 'menu_manager/student_menu_settings',
            component: function (res, rej) {
                require(['/web/js/admin/menu_manager/menu_manager.js'], function (data) {
                    res(data['admin_menu_settings']);
                });
            }
        }
    ]
}, {
    path: '/menu_manager/*', redirect: '/404'
}];

