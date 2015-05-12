package com.xmdx.demo.back.service;

import com.e9rj.platform.common.GenID;
import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.frameext.simpledb.DBDYDao;
import com.xmzy.frameext.simpledb.DBDYPO;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

/**
 * Created by Administrator on 2015/4/1.
 */
@Service(name="back.fin_ins")
public class FinancialInstitutionService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "back.fin_ins";
    private final static String TABLE_NAME = "TB_FINANCIAL_INSTITUTION";
    private final static String KEY_FIELD = "F_ID";

    @Override
    public int init(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_ONE);
        actionContext.setStringValue("tabLogo", AUTH_FUNC_NO);
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/back/financial_institution_main.html");
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
        DBDYPO financialInstitution = new DBDYPO(TABLE_NAME, KEY_FIELD, request);
        String fId = request.getParameter(KEY_FIELD);
        int result = 0;

        if (StringUtils.isNotBlank(fId)) {

            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_FOUR);
            result = DBDYDao.update(actionContext.getConnection(), financialInstitution);

        } else {

            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_TWO);

            fId = GenID.genIdString("F", 21);
            financialInstitution.set(KEY_FIELD, fId);
            result = DBDYDao.insert(actionContext.getConnection(), financialInstitution);
        }
        if (0 == result) {
            setMessage(actionContext, "保存金融机构失败!");
        } else {
            setMessage(actionContext, "保存金融机构成功!");
        }

        return CONST_RESULT_AJAX;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_EIGHT);

        String fIdStr = actionContext.getHttpRequest().getParameter("F_ID");

        int result;
        if (StringUtils.isNotBlank(fIdStr)) {
            String []fIds = fIdStr.split(",");
            result = 0;
            for (String fId : fIds) {
                if (StringUtils.isNotBlank(fId)) {
                    DBDYPO po = new DBDYPO(TABLE_NAME, KEY_FIELD);
                    po.set(KEY_FIELD, fId);
                    result = DBDYDao.delete(actionContext.getConnection(), po);
                    if (result == 0) {
                        setMessage(actionContext, "删除金融机构失败");
                        return CONST_RESULT_AJAX;
                    }
                }
            }
        }
        setMessage(actionContext, "删除金融机构成功");
        return CONST_RESULT_AJAX;
    }

    @Override
    public int goTo(ActionContext actionContext) throws Exception {
        DBDYPO po = new DBDYPO(TABLE_NAME, KEY_FIELD, actionContext.getHttpRequest());
        String fId = request.getParameter("F_ID");
        if (StringUtils.isNotEmpty(fId)) {

            if("read".equalsIgnoreCase(actionContext.getStringValue(CONST_RESOURCEAUTH))) {
                //�鿴
                checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_ONE);
            } else {
                // �޸�
                checkAuth(actionContext,AUTH_FUNC_NO, RIGHT_FOUR);
            }

            DBDYPO[] pos = DBDYDao.selectByID(actionContext.getConnection(), po);

            if(pos.length == 0) {
                actionContext.setErrorContext("您所选择的金融机构已被删除");
                return CONST_RESULT_ERROR;
            }
            DBDYPO old = pos[0];
            old.setCmd("U");
            actionContext.setObjValue("FINANCIAL_INSTITUTION_BEAN", old);
        } else {
            // ����
            checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_TWO);
            po.setCmd("A");
            actionContext.setObjValue("FINANCIAL_INSTITUTION_BEAN", po);
        }
        actionContext.setStringValue("FORMNAME", "com/xmdx/demo/back/financial_institution_edit.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int insertExportData(ActionContext actionContext) throws Exception {
        return 0;
    }
}
