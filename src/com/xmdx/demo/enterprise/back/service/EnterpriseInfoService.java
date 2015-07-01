package com.xmdx.demo.enterprise.back.service;

import com.e9rj.platform.common.GenID;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

/**
 * Created by Administrator on 2015/6/29.
 */
@Service(name="enterprise.info")
public class EnterpriseInfoService extends BusinessServices {

    //功能号
    private static final String authFuncNo = "enterprise.info";
    //表名
    private static final String tableName = "TB_USER";
    //主键名
    private static final String keyField = "ID";

    /**
     * 删除用户
     */
    @Override
    public int delete(ActionContext ac) throws Exception {

        checkAuth(ac, authFuncNo, RIGHT_EIGHT);

        String uidStr = ac.getHttpRequest().getParameter("ID");

        if(StringUtils.isNotBlank(uidStr)) {
            String[] uids = uidStr.split(",");
            int result = 0;
            for (String uid : uids) {
                if(StringUtils.isNotBlank(uid)) {
                    DBDYPO po = new DBDYPO(tableName, keyField);
                    po.set(keyField, uid);

                    result = DBDYDao.delete(ac.getConnection(), po);

                    if(result == 0) {
                        super.log(ac, LOGLEVEL_W, "SYS01", po.getTableName(), uid, "delete", "删除用户失败!");
                    } else {
                        super.log(ac, LOGLEVEL_I, "SYS01", po.getTableName(), uid, "delete", "删除用户成功!");
                    }
                }
            }
        }
        setMessage(ac, "删除用户成功!");
        return CONST_RESULT_AJAX;
    }

    /**
     * 打开用户信息编辑页面
     */
    @Override
    public int goTo(ActionContext ac) throws Exception {
        DBDYPO po = new DBDYPO(tableName, keyField, ac.getHttpRequest());
        String uid = ac.getHttpRequest().getParameter("ID");
        if (StringUtils.isNotEmpty(uid)) {

            if("read".equalsIgnoreCase(ac.getStringValue(CONST_RESOURCEAUTH))) {
                //查看
                checkAuth(ac, authFuncNo, RIGHT_ONE);
            } else {
                // 修改
                checkAuth(ac, authFuncNo, RIGHT_FOUR);
            }

            DBDYPO[] pos = DBDYDao.selectByID(ac.getConnection(), po);

            if(pos.length == 0) {
                ac.setErrorContext("您所选择的企业用户已被删除！");
                return CONST_RESULT_ERROR;
            }
            DBDYPO old = pos[0];
            old.setCmd("U");
            ac.setObjValue("USER_BEAN", old);
        } else {
            // 新增
            checkAuth(ac, authFuncNo, RIGHT_TWO);
            po.setCmd("A");
            ac.setObjValue("USER_BEAN", po);
        }
        ac.setStringValue("FORMNAME", "com/xmdx/demo/enterprise/enterprise_info.html");
        return CONST_RESULT_SUCCESS;
    }

    /**
     * 打开用户列表页
     */
    @Override
    public int init(ActionContext ac) throws Exception {

        checkAuth(ac, authFuncNo, RIGHT_ONE);

        ac.setStringValue("tabLogo", authFuncNo);
        ac.setStringValue(CONST_FORMNAME, "com/xmdx/demo/enterprise/enterprise_info.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int insertExportData(ActionContext arg0) throws Exception {
        // TODO Auto-generated method stub
        return 0;
    }

    /**
     * 查询用户信息
     */
    @Override
    public int query(ActionContext ac) throws Exception {

        StringBuilder sql = new StringBuilder("SELECT * FROM TB_USER U ");
        String userName = request.getParameter("A_E_NAME");

        if(StringUtils.isNotBlank(userName)) {
            sql.append(" WHERE U.A_E_NAME LIKE '%").append(userName).append("%' ");
        }

        //设置排序条件，默认的按ID降序
        sql.append(super.order(ac, "U.ID", "DESC"));

        querySql = sql.toString();

        //代码转换
        //addNameCodeConvert("SEX", CodeNameConvert.getCachedData("SYSCODE", "SEX"), REPLACE);
        return CONST_RESULT_AJAX;
    }

    /**
     * 保存用户信息
     */
    @Override
    public int save(ActionContext ac) throws Exception {

        DBDYPO user = new DBDYPO(tableName, keyField, request);
        String uid = request.getParameter(keyField);
        int result = 0;
        boolean isAdd = false;

        if (StringUtils.isNotBlank(uid)) {
            //修改
            checkAuth(ac, authFuncNo, RIGHT_FOUR);
            result = DBDYDao.update(ac.getConnection(), user);

        } else {
            //新增
            checkAuth(ac, authFuncNo, RIGHT_TWO);

            uid = GenID.genIdString("U", 21);
            user.set(keyField, uid);
            isAdd = true;
            result = DBDYDao.insert(ac.getConnection(), user);
        }
        if(0 == result) {
            log(ac, LOGLEVEL_W, "SYS01", user.getTableName(), uid, isAdd ? "insert" : "update", "保存用户失败!");
            setMessage(ac, "保存用户失败!");
        } else {
            log(ac, LOGLEVEL_I, "SYS01", user.getTableName(), uid, isAdd ? "insert" : "update", "保存用户成功!");
            setMessage(ac, "保存用户成功!");
        }

        return CONST_RESULT_AJAX;


    }

}
