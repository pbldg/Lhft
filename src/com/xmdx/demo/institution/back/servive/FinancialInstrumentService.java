package com.xmdx.demo.institution.back.servive;

import com.e9rj.platform.common.GenID;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

/**
 * Created by lenovo on 2015/5/5.
 */
@Service(name = "ins.fin_instru")
public class FinancialInstrumentService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "back.fin_instru";
    private final static String TABLE_NAME = "TB_FINANCIAL_INSTRUMENT";
    private final static String KEY_FIELD = "F_ID";

    @Override
    public int init(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_ONE);
        actionContext.setStringValue("tabLogo", AUTH_FUNC_NO);
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/back/financial_instrument_main.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int query(ActionContext actionContext) throws Exception {
        StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s T ", TABLE_NAME));
        String name = request.getParameter("NAME");

        if (StringUtils.isNotBlank(name)) {
            sql.append(" WHERE T.NAME LIKE '%").append(name).append("%' ");
        }

        sql.append(super.order(actionContext, "T.CREATE_TIME", "DESC"));

        querySql = sql.toString();

        return CONST_RESULT_AJAX;
    }

    @Override
    public int save(ActionContext actionContext) throws Exception {
        DBDYPO fi = new DBDYPO(TABLE_NAME, KEY_FIELD, request);
        String fiid = actionContext.getHttpRequest().getParameter("ID");
        int result = 0;
        boolean isAdd = false;
        if (StringUtils.isNotEmpty(fiid)) {
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_FOUR);
            result = DBDYDao.update(actionContext.getConnection(), fi);
        } else {
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_TWO);
            fiid = GenID.genIdString("U", 21);
            fi.set(KEY_FIELD, fiid);
            isAdd = true;
            result = DBDYDao.insert(actionContext.getConnection(), fi);
        }
        if (result == 0) {
            setMessage(actionContext, "保存金融工具失败！");
        } else {
            setMessage(actionContext, "保存金融工具成功！");
        }
        return CONST_RESULT_AJAX;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_EIGHT);
        String fiidStr = actionContext.getHttpRequest().getParameter("ID");
        if (StringUtils.isNotBlank(fiidStr)) {
            String[] fiids = fiidStr.split(",");
            int result = 0;
            for (String fiid : fiids) {
                DBDYPO po = new DBDYPO(TABLE_NAME, KEY_FIELD);
                po.set(KEY_FIELD, fiid);
                result = DBDYDao.delete(actionContext.getConnection(), po);

            }
        }
        setMessage(actionContext, "删除金融工具成功！");
        return CONST_RESULT_AJAX;
    }

    @Override
    public int goTo(ActionContext actionContext) throws Exception {
        DBDYPO po = new DBDYPO(TABLE_NAME, KEY_FIELD, actionContext.getHttpRequest());
        String fiid = actionContext.getHttpRequest().getParameter("ID");
        if (StringUtils.isNotEmpty(fiid)) {
            if ("read".equalsIgnoreCase(actionContext.getStringValue(CONST_RESOURCEAUTH))) {
                //查看
                checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_ONE);
            } else {
                // 修改
                checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_FOUR);
            }
            DBDYPO[] pos = DBDYDao.selectByID(actionContext.getConnection(), po);
            if (pos.length == 0) {
                actionContext.setErrorContext("您选择的金融工具已被删除！");
                return CONST_RESULT_ERROR;
            }
            DBDYPO old = pos[0];
            old.setCmd("U");
            actionContext.setObjValue("FI_BEAN", old);
        } else {
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_TWO);
            po.setCmd("A");
            actionContext.setObjValue("FI_BEAN", po);
        }
        actionContext.setStringValue("FORMNAME", "com/xmdx/demo/back/financial_instrument_edit.html");
        return CONST_RESULT_SUCCESS;

    }

    @Override
    public int insertExportData(ActionContext actionContext) throws Exception {
        return 0;
    }
}
