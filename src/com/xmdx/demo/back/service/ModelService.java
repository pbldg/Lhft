package com.xmdx.demo.back.service;

import com.e9rj.platform.common.services.BusinessServices;
import com.xmzy.frameext.business.service.annotate.Service;
import com.xmzy.framework.context.ActionContext;
import org.apache.commons.lang.StringUtils;

/**
 * Created by lenovo on 2015/5/6.
 */
@Service(name="back.model")
public class ModelService extends BusinessServices {

    private final static String AUTH_FUNC_NO = "back.model";
    private final static String TABLE_NAME = "TB_MODEL";
    private final static String KEY_FIELD = "M_ID";
    @Override
    public int init(ActionContext actionContext) throws Exception {
        checkAuth(actionContext, AUTH_FUNC_NO, RIGHT_ONE);
        actionContext.setStringValue("tabLogo", AUTH_FUNC_NO);
        actionContext.setStringValue(CONST_FORMNAME, "com/xmdx/demo/back/model_main.html");
        return CONST_RESULT_SUCCESS;
    }

    @Override
    public int query(ActionContext actionContext) throws Exception {
        StringBuilder sql = new StringBuilder(String.format("SELECT * FROM %s T ", TABLE_NAME));
        String name = request.getParameter("NAME");

        if (StringUtils.isNotBlank(name)) {
            sql.append(" WHERE T.NAME LIKE '%").append(name).append("%' ");
        }

        sql.append(super.order(actionContext, "T.ID", "DESC"));

        querySql = sql.toString();

        return CONST_RESULT_AJAX;
    }

    @Override
    public int save(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int delete(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int goTo(ActionContext actionContext) throws Exception {
        return 0;
    }

    @Override
    public int insertExportData(ActionContext actionContext) throws Exception {
        return 0;
    }
}
